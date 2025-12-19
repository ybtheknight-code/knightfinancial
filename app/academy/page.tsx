import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import { FREE_COURSES, PRIME_COURSES, COURSE_CATEGORIES } from '@/lib/academy-courses';

export default async function AcademyPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_prime, courses_completed')
    .eq('id', user.id)
    .single();
  
  const isPrime = profile?.is_prime || false;
  const allCourses = [...FREE_COURSES, ...PRIME_COURSES];
  const freeCount = FREE_COURSES.length;
  const primeCount = PRIME_COURSES.length;
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-4">📚 Knight Academy</h1>
          <p className="text-gray-400 mb-4">Master credit repair with expert-level knowledge</p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full">
              ✅ {freeCount} FREE Courses
            </span>
            <span className="bg-knight-gold/20 text-knight-gold px-4 py-2 rounded-full">
              👑 {primeCount} PRIME Courses
            </span>
          </div>
        </div>
        
        {/* PRIME Upsell */}
        {!isPrime && (
          <Card className="mb-8 border-2 border-knight-gold bg-gradient-to-r from-knight-gold/10 to-transparent">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-knight-gold mb-2">⭐ Unlock PRIME Courses</h2>
                <p className="text-gray-300">
                  Get access to {primeCount}+ exclusive courses including Metro 2 Mastery, 
                  Omission Harm Theory, and Advanced Litigation Strategies.
                </p>
              </div>
              <Link href="/pricing" className="btn-knight whitespace-nowrap">
                Upgrade to PRIME
              </Link>
            </div>
          </Card>
        )}
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {COURSE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="bg-knight-hover hover:bg-knight-gold-dark px-4 py-2 rounded-full text-white text-sm transition"
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
        
        {/* FREE Courses Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">FREE</span>
            Alpha Training ({freeCount} Courses)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FREE_COURSES.map((course) => (
              <Link key={course.id} href={`/academy/${course.id}`}>
                <Card className="h-full hover:border-knight-gold transition cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{course.icon}</span>
                    <div>
                      <h3 className="text-white font-bold">{course.title}</h3>
                      <p className="text-gray-400 text-sm">{course.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="bg-knight-hover px-2 py-1 rounded text-gray-300">
                        {course.duration}
                      </span>
                      <span className="bg-knight-hover px-2 py-1 rounded text-gray-300">
                        {course.lessons.length} lessons
                      </span>
                    </div>
                    <span className="text-knight-gold font-bold">+{course.points} pts</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        {/* PRIME Courses Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-knight-gold to-yellow-500 text-black px-3 py-1 rounded text-sm">PRIME</span>
            Elite Training ({primeCount} Courses)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRIME_COURSES.map((course) => (
              <div key={course.id} className="relative">
                {!isPrime && (
                  <div className="absolute inset-0 bg-knight-black/80 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">🔒</span>
                      <span className="text-knight-gold font-bold">PRIME ONLY</span>
                    </div>
                  </div>
                )}
                <Link href={isPrime ? `/academy/${course.id}` : '/pricing'}>
                  <Card className="h-full hover:border-knight-gold transition cursor-pointer border-knight-gold/30">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{course.icon}</span>
                      <div>
                        <h3 className="text-white font-bold">{course.title}</h3>
                        <p className="text-gray-400 text-sm">{course.category}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-knight-hover px-2 py-1 rounded text-gray-300">
                          {course.duration}
                        </span>
                        <span className="bg-knight-hover px-2 py-1 rounded text-gray-300">
                          {course.lessons.length} lessons
                        </span>
                      </div>
                      <span className="text-knight-gold font-bold">+{course.points} pts</span>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </section>
        
        {/* Bottom CTA */}
        {!isPrime && (
          <div className="mt-12 text-center">
            <Card className="inline-block">
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Level Up?</h2>
              <p className="text-gray-400 mb-4">
                PRIME members get access to ALL courses plus Knight AI, social clout features, and more.
              </p>
              <Link href="/pricing" className="btn-knight">
                ⭐ Upgrade to PRIME - $19.99/mo
              </Link>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
