import { requireAuth } from '@/lib/auth';
import Card from '@/components/Card';
import Link from 'next/link';
import { generateCourses } from '@/lib/course-generator';

export default async function AcademyPage() {
  const user = await requireAuth();
  const courses = generateCourses();
  
  const isPrime = user.is_prime || ['admin', 'executive', 'ceo'].includes(user.role);
  
  // Group by category
  const categories = courses.reduce((acc, course) => {
    if (!acc[course.category]) acc[course.category] = [];
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);
  
  const freeCourses = courses.filter(c => !c.premium);
  const premiumCourses = courses.filter(c => c.premium);
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">📚 Knight Academy</h1>
          <p className="text-gray-400">Master credit law, FCRA, and pro se litigation</p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <div className="badge-gold">{freeCourses.length} FREE Courses</div>
            <div className="badge-gold">{premiumCourses.length} PRIME Courses</div>
            <div className="badge-gold">{courses.reduce((sum, c) => sum + c.lessons.length, 0)} Total Lessons</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-2xl font-bold text-knight-gold">{user.courses_completed || 0}</div>
            <div className="text-sm text-gray-400">Courses Completed</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold text-knight-gold">
              {courses.reduce((sum, c) => sum + c.estimated_duration, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Minutes of Content</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-knight-gold">
              {user.badges?.includes('scholar') ? 'Scholar' : 'In Progress'}
            </div>
            <div className="text-sm text-gray-400">Your Status</div>
          </Card>
        </div>
        
        {!isPrime && (
          <Card className="mb-8" premium>
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h2 className="text-2xl font-bold text-white mb-2">Unlock {premiumCourses.length} Premium Courses</h2>
              <p className="text-gray-300 mb-6">
                Get advanced strategies, expert tactics, and comprehensive legal training
              </p>
              <Link href="/pricing" className="btn-gold inline-block">
                Upgrade to Prime - $19.99/mo
              </Link>
            </div>
          </Card>
        )}
        
        {/* FREE COURSES */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">🆓 Free Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeCourses.map((course) => (
              <Link key={course.slug} href={`/academy/${course.slug}`}>
                <Card hover>
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        course.difficulty === 'beginner' ? 'bg-green-600' :
                        course.difficulty === 'intermediate' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {course.difficulty.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{course.estimated_duration} min</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{course.description}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {course.lessons.length} lessons • Category: {course.category}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-knight-gold-dark">
                    <span className="text-knight-gold text-sm font-bold">Start Course →</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        {/* PREMIUM COURSES */}
        {isPrime && (
          <div>
            <h2 className="text-3xl font-bold text-knight-gold mb-6">⭐ Prime Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumCourses.slice(0, 12).map((course) => (
                <Link key={course.slug} href={`/academy/${course.slug}`}>
                  <Card hover premium>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="premium-badge">⭐ PRIME</span>
                        <span className="text-xs text-gray-400">{course.estimated_duration} min</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{course.description}</p>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {course.lessons.length} lessons • {course.difficulty}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-knight-gold">
                      <span className="text-knight-gold text-sm font-bold">Start Course →</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-400">
                Showing 12 of {premiumCourses.length} Prime courses
              </p>
            </div>
          </div>
        )}
        
        {/* LOCKED PREMIUM PREVIEW */}
        {!isPrime && (
          <div>
            <h2 className="text-3xl font-bold text-knight-gold mb-6">🔒 Prime Courses (Locked)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumCourses.slice(0, 6).map((course) => (
                <Card key={course.slug} className="relative overflow-hidden opacity-75">
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔒</div>
                      <p className="text-white font-bold">Prime Only</p>
                    </div>
                  </div>
                  
                  <div className="mb-3 blur-sm">
                    <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-400">{course.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/pricing" className="btn-gold inline-block">
                Unlock All {premiumCourses.length} Prime Courses
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
