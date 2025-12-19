'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import { FREE_COURSES, PRIME_COURSES } from '@/lib/academy-courses';
import { createClient } from '@/lib/supabase';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isPrime, setIsPrime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  
  const supabase = createClient();
  
  // Find course
  const allCourses = [...FREE_COURSES, ...PRIME_COURSES];
  const course = allCourses.find(c => c.id === courseId);
  const isFreeCourse = FREE_COURSES.some(c => c.id === courseId);
  
  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_prime')
        .eq('id', user.id)
        .single();
      
      setIsPrime(profile?.is_prime || false);
      setLoading(false);
      
      // Load progress from localStorage
      const saved = localStorage.getItem(`course_progress_${courseId}`);
      if (saved) {
        const progress = JSON.parse(saved);
        setCompletedLessons(progress.completed || []);
        setCurrentLesson(progress.current || 0);
      }
    };
    
    checkAccess();
  }, [courseId, router, supabase]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-knight-black flex items-center justify-center">
        <div className="text-knight-gold text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen bg-knight-black py-8">
        <div className="container-knight text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Course Not Found</h1>
          <Link href="/academy" className="btn-knight">← Back to Academy</Link>
        </div>
      </div>
    );
  }
  
  // Check access for PRIME courses
  if (!isFreeCourse && !isPrime) {
    return (
      <div className="min-h-screen bg-knight-black py-8">
        <div className="container-knight text-center">
          <Card className="max-w-xl mx-auto">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold text-white mb-4">PRIME Course</h1>
            <p className="text-gray-400 mb-6">
              "{course.title}" is exclusive to Knight PRIME members.
            </p>
            <Link href="/pricing" className="btn-knight">
              ⭐ Upgrade to PRIME
            </Link>
          </Card>
        </div>
      </div>
    );
  }
  
  const lesson = course.lessons[currentLesson];
  const progress = Math.round((completedLessons.length / course.lessons.length) * 100);
  
  const saveProgress = (completed: number[], current: number) => {
    localStorage.setItem(`course_progress_${courseId}`, JSON.stringify({
      completed,
      current,
    }));
  };
  
  const markComplete = async () => {
    if (!completedLessons.includes(currentLesson)) {
      const newCompleted = [...completedLessons, currentLesson];
      setCompletedLessons(newCompleted);
      saveProgress(newCompleted, currentLesson);
      
      // Award points if course complete
      if (newCompleted.length === course.lessons.length) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.rpc('increment_points', {
            user_id: user.id,
            amount: course.points,
          });
          
          // Update courses completed count
          await supabase
            .from('user_profiles')
            .update({ 
              courses_completed: supabase.rpc('increment', { x: 1 }) 
            } as any)
            .eq('id', user.id);
        }
      }
    }
    
    // Go to next lesson
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      saveProgress(completedLessons, currentLesson + 1);
      setQuizAnswers({});
      setShowQuizResults(false);
    }
  };
  
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };
  
  const checkQuiz = () => {
    setShowQuizResults(true);
  };
  
  const allQuizCorrect = lesson.quiz?.every((q, i) => quizAnswers[i] === q.correct) || false;
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/academy" className="text-gray-400 hover:text-white">
            ← Back to Academy
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Progress:</span>
            <div className="w-32 bg-knight-hover rounded-full h-2">
              <div 
                className="bg-knight-gold h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-knight-gold font-bold">{progress}%</span>
          </div>
        </div>
        
        {/* Course Title */}
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{course.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{course.title}</h1>
              <p className="text-gray-400">{course.category} • {course.duration} • +{course.points} pts</p>
            </div>
          </div>
        </Card>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Lesson List */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-lg font-bold text-white mb-4">📚 Lessons</h2>
              <div className="space-y-2">
                {course.lessons.map((l, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentLesson(i);
                      setQuizAnswers({});
                      setShowQuizResults(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center gap-2 ${
                      currentLesson === i
                        ? 'bg-knight-gold text-black'
                        : completedLessons.includes(i)
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-knight-hover text-gray-300 hover:bg-knight-gold-dark'
                    }`}
                  >
                    <span>
                      {completedLessons.includes(i) ? '✅' : currentLesson === i ? '📖' : '○'}
                    </span>
                    <span className="text-sm truncate">{l.title}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Lesson Content */}
          <div className="lg:col-span-3">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-2">{lesson.title}</h2>
              <p className="text-gray-400 mb-6">Lesson {currentLesson + 1} of {course.lessons.length}</p>
              
              {/* Content */}
              <div className="prose prose-invert max-w-none mb-8">
                <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {lesson.content}
                </div>
              </div>
              
              {/* Quiz */}
              {lesson.quiz && lesson.quiz.length > 0 && (
                <div className="border-t border-knight-gold-dark pt-6 mt-6">
                  <h3 className="text-xl font-bold text-knight-gold mb-4">📝 Knowledge Check</h3>
                  <div className="space-y-6">
                    {lesson.quiz.map((q, qi) => (
                      <div key={qi} className="bg-knight-hover rounded-lg p-4">
                        <p className="text-white font-bold mb-3">{qi + 1}. {q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, oi) => (
                            <button
                              key={oi}
                              onClick={() => handleQuizAnswer(qi, oi)}
                              disabled={showQuizResults}
                              className={`w-full text-left p-3 rounded-lg transition ${
                                showQuizResults
                                  ? oi === q.correct
                                    ? 'bg-green-600 text-white'
                                    : quizAnswers[qi] === oi
                                    ? 'bg-red-600 text-white'
                                    : 'bg-knight-black text-gray-400'
                                  : quizAnswers[qi] === oi
                                  ? 'bg-knight-gold text-black'
                                  : 'bg-knight-black text-gray-300 hover:bg-knight-gold-dark'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {!showQuizResults ? (
                    <button
                      onClick={checkQuiz}
                      disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                      className="btn-knight mt-4 disabled:opacity-50"
                    >
                      Check Answers
                    </button>
                  ) : (
                    <div className={`mt-4 p-4 rounded-lg ${allQuizCorrect ? 'bg-green-600/20' : 'bg-red-600/20'}`}>
                      {allQuizCorrect ? (
                        <p className="text-green-400 font-bold">🎉 All correct! You can continue.</p>
                      ) : (
                        <p className="text-red-400 font-bold">❌ Some answers incorrect. Review and try again!</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-knight-gold-dark">
                <button
                  onClick={() => {
                    if (currentLesson > 0) {
                      setCurrentLesson(currentLesson - 1);
                      setQuizAnswers({});
                      setShowQuizResults(false);
                    }
                  }}
                  disabled={currentLesson === 0}
                  className="btn-knight-outline disabled:opacity-50"
                >
                  ← Previous
                </button>
                
                {currentLesson === course.lessons.length - 1 && completedLessons.length === course.lessons.length - 1 ? (
                  <button
                    onClick={markComplete}
                    disabled={lesson.quiz && !allQuizCorrect}
                    className="btn-knight disabled:opacity-50"
                  >
                    🏆 Complete Course (+{course.points} pts)
                  </button>
                ) : (
                  <button
                    onClick={markComplete}
                    disabled={lesson.quiz && lesson.quiz.length > 0 && !allQuizCorrect}
                    className="btn-knight disabled:opacity-50"
                  >
                    {completedLessons.includes(currentLesson) ? 'Next Lesson →' : 'Mark Complete & Continue →'}
                  </button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
