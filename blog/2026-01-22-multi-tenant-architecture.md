---
slug: why-multi-tenant-architecture
title: "Why We Chose Multi-Tenant Architecture for School Management"
authors: [incrisz]
tags: [technical, architecture, saas, multi-tenancy]
---

When we started building Cyfamod, one of the most critical decisions we faced was: **How do we serve multiple schools efficiently?**

The answer: Multi-tenant architecture. Here's why we made that choice and what we learned along the way.

<!-- truncate -->

## The Problem: Scaling School Management

Imagine this scenario:
- School A has 500 students
- School B has 2,000 students  
- School C has 100 students

Each school needs:
- Complete data isolation (School A can't see School B's data)
- Custom configurations (different fee structures, grading systems)
- High availability (downtime affects hundreds of students)
- Cost-effective pricing

**The question:** Do we deploy separate instances for each school, or build one system that serves them all?

## Option 1: Single-Tenant (One Instance Per School)

### Pros:
- Complete isolation (each school has its own database and server)
- Easier to customize per school
- One school's issues don't affect others

### Cons:
- **Expensive** - Each school needs its own infrastructure
- **Slow onboarding** - Setting up a new school takes hours/days
- **Maintenance nightmare** - Updates must be deployed to dozens of instances
- **Inconsistent experience** - Schools on different versions have different features

**Verdict:** This would have killed us financially and operationally.

## Option 2: Multi-Tenant (One Instance, Many Schools)

### Pros:
- **Cost-effective** - Shared infrastructure across all schools
- **Fast onboarding** - New schools start in minutes
- **Easy updates** - Deploy once, all schools benefit
- **Consistent experience** - Everyone on the same version

### Cons:
- **Complex architecture** - Data isolation is critical
- **Performance concerns** - One school's load affects others
- **Security risks** - A breach could affect multiple schools

**Verdict:** The pros outweighed the cons—if we built it right.

## How We Implemented Multi-Tenancy

### 1. **Database Design: Shared Database, Separate Schemas**

We use a **shared database with tenant isolation** approach:

```sql
-- Every table has a tenant_id column
CREATE TABLE students (
    id BIGINT PRIMARY KEY,
    tenant_id BIGINT NOT NULL,  -- Links to the school
    name VARCHAR(255),
    email VARCHAR(255),
    -- ... other fields
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Index for fast tenant-based queries
CREATE INDEX idx_students_tenant ON students(tenant_id);
```

**Why this works:**
- All data is in one database (easier to manage)
- Every query is automatically scoped to a tenant
- Impossible to accidentally query another school's data

### 2. **Tenant Identification: Subdomain-Based**

Each school gets a unique subdomain:
- `school-a.cyfamod.com`
- `school-b.cyfamod.com`
- `school-c.cyfamod.com`

When a request comes in:
1. Extract subdomain from the URL
2. Look up the tenant in our `tenants` table
3. Set the tenant context for all subsequent queries

```php
// Laravel middleware example
public function handle($request, Closure $next)
{
    $subdomain = $this->getSubdomain($request);
    $tenant = Tenant::where('subdomain', $subdomain)->firstOrFail();
    
    // Set tenant context
    app()->instance('tenant', $tenant);
    
    return $next($request);
}
```

### 3. **Data Isolation: Global Scopes**

To prevent accidental data leaks, we use **global query scopes**:

```php
// Automatically filter all queries by tenant
class Student extends Model
{
    protected static function booted()
    {
        static::addGlobalScope('tenant', function (Builder $builder) {
            $builder->where('tenant_id', app('tenant')->id);
        });
    }
}

// Now all queries are automatically scoped
$students = Student::all();  // Only returns current tenant's students
```

**Safety net:** Even if a developer forgets to filter by tenant, the global scope ensures data isolation.

### 4. **Performance Optimization: Tenant-Aware Caching**

Caching in a multi-tenant system requires careful key management:

```php
// Bad: Cache key collision between tenants
Cache::get('students');

// Good: Tenant-specific cache keys
Cache::get("tenant:{$tenantId}:students");
```

We also use:
- **Database connection pooling** to handle concurrent tenant requests
- **Query optimization** with proper indexing on `tenant_id`
- **CDN caching** for static assets

## Challenges We Faced

### **Challenge 1: Tenant Onboarding**

Creating a new school used to involve:
1. Manual database setup
2. Configuring subdomain
3. Setting up initial admin user
4. Importing school data

**Solution:** We automated everything with a tenant provisioning service:

```bash
php artisan tenant:create "St. Mary's School" --subdomain=stmarys
```

This command:
- Creates tenant record
- Sets up subdomain DNS
- Seeds default data (roles, permissions)
- Sends welcome email to admin

**Result:** Onboarding went from hours to minutes.

### **Challenge 2: Database Migrations**

Running migrations in a multi-tenant system is tricky:
- Do we migrate all tenants at once?
- What if a migration fails for one tenant?

**Solution:** Tenant-aware migration system:

```bash
# Migrate all tenants
php artisan migrate:tenants

# Migrate specific tenant
php artisan migrate:tenants --tenant=stmarys
```

We also implemented:
- **Rollback capability** per tenant
- **Migration status tracking** to know which tenants are on which version
- **Automated backups** before migrations

### **Challenge 3: Testing**

Testing multi-tenant features requires:
- Creating test tenants
- Ensuring data isolation in tests
- Cleaning up after tests

**Solution:** Test helpers for tenant management:

```php
public function test_student_creation()
{
    $tenant = $this->createTenant();
    $this->actingAsTenant($tenant);
    
    $student = Student::create([...]);
    
    $this->assertDatabaseHas('students', [
        'tenant_id' => $tenant->id,
        'name' => $student->name,
    ]);
}
```

## Benefits We've Seen

### **1. Cost Savings**
- **Before:** $50/month per school (separate servers)
- **After:** $5/month per school (shared infrastructure)

**Savings:** 90% reduction in infrastructure costs

### **2. Faster Onboarding**
- **Before:** 2-3 days to set up a new school
- **After:** 5 minutes

**Impact:** We can onboard schools instantly, removing a major sales friction point.

### **3. Easier Maintenance**
- **Before:** Deploy updates to 20+ instances individually
- **After:** One deployment, all schools updated

**Impact:** We ship features faster and with less risk.

### **4. Better Resource Utilization**
- Small schools (100 students) share resources with larger schools (2,000 students)
- Database connection pooling reduces idle connections
- Shared caching improves performance for all tenants

## Lessons Learned

### **1. Security is Non-Negotiable**
Data isolation must be bulletproof. We:
- Use global scopes to prevent leaks
- Run regular security audits
- Test tenant isolation in every feature

### **2. Performance Monitoring is Critical**
One tenant's load can affect others. We monitor:
- Query performance per tenant
- Resource usage per tenant
- Slow queries that need optimization

### **3. Tenant Customization is Limited**
While we support some customization (logos, colors, fee structures), we can't offer unlimited flexibility.

**Trade-off:** Standardization enables scale, but limits uniqueness.

### **4. Backup and Recovery Must Be Tenant-Aware**
We can't restore the entire database for one tenant's issue. Our backup strategy:
- Daily full database backups
- Tenant-specific data export capability
- Point-in-time recovery per tenant

## When Multi-Tenancy Makes Sense

Multi-tenant architecture is great for:
- **SaaS products** serving many similar customers
- **Cost-sensitive markets** where pricing matters
- **Rapid scaling** where onboarding speed is critical

It's NOT ideal for:
- **Highly customized** solutions per customer
- **Regulated industries** requiring physical data separation
- **Extremely large** tenants that need dedicated resources

## The Future: Hybrid Approach

As we grow, we're considering a **hybrid model**:
- **Small/medium schools:** Multi-tenant (shared infrastructure)
- **Large schools/districts:** Single-tenant (dedicated infrastructure)

This gives us:
- Cost efficiency for most customers
- Dedicated resources for enterprise clients
- Flexibility to serve all market segments

## Final Thoughts

Choosing multi-tenant architecture was one of the best decisions we made for Cyfamod. It's allowed us to:
- Serve schools affordably
- Scale quickly
- Maintain high quality

But it required careful planning, robust security, and constant monitoring.

If you're building a SaaS product, consider multi-tenancy—but understand the trade-offs and build it right from the start.

---

*Want to see our multi-tenant implementation? Check out our [GitHub repository](https://github.com/Cyfamod-Technologies). Have questions? Join our [Discord community](https://discord.gg/b5bVqS3b).*
