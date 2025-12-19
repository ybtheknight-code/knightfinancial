import Card from '@/components/Card';
import { KNIGHT_CONSTANTS } from '@/utils';

export default function PointsGuidePage() {
  const points = KNIGHT_CONSTANTS.POINTS;
  
  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⭐</div>
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">Knight Points System</h1>
          <p className="text-xl text-gray-400">Every action you take earns points</p>
        </div>
        
        {/* Why Points Matter */}
        <Card premium className="mb-8">
          <h2 className="text-2xl font-bold text-gradient-gold mb-4">Why Points Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-bold text-white mb-2">Leaderboard Rank</h3>
              <p className="text-gray-300 text-sm">Top 100 users displayed publicly</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🎖️</div>
              <h3 className="font-bold text-white mb-2">Unlock Badges</h3>
              <p className="text-gray-300 text-sm">10 achievement badges to earn</p>
            </div>
            <div>
              <div className="text-4xl mb-2">👑</div>
              <h3 className="font-bold text-white mb-2">Community Status</h3>
              <p className="text-gray-300 text-sm">Points display next to your name</p>
            </div>
          </div>
        </Card>
        
        {/* Daily Actions */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">📅 Daily Actions</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Daily Login</div>
                  <div className="text-sm text-gray-400">Log in once per day</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.LOGIN}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Streak Bonus 🔥</div>
                  <div className="text-sm text-gray-400">Login 2+ days in a row</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.DAILY_STREAK_BONUS}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Complete Profile</div>
                  <div className="text-sm text-gray-400">Fill out all profile fields</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.PROFILE_COMPLETE}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Forms */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">📋 Knight Forms</h2>
          <Card>
            <p className="text-gray-400 mb-4">Complete any of our 50 forms to document violations and earn points</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Basic Forms</div>
                  <div className="text-sm text-gray-400">Quick violation reports</div>
                </div>
                <div className="text-knight-gold font-bold">{points.FORM_COMPLETE_MIN}-30 pts</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Detailed Forms</div>
                  <div className="text-sm text-gray-400">Harm documentation, lawsuits</div>
                </div>
                <div className="text-knight-gold font-bold">35-100 pts</div>
              </div>
              
              <div className="flex justify-between items-center bg-knight-gold-dark p-3 rounded">
                <div>
                  <div className="font-bold text-white">Premium Forms 💎</div>
                  <div className="text-sm text-gray-400">Lawsuit won, success stories</div>
                </div>
                <div className="text-knight-gold font-bold">100-{points.FORM_COMPLETE_MAX} pts</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Academy */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">📚 Knight Academy</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Complete Lesson</div>
                  <div className="text-sm text-gray-400">Finish any lesson</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.LESSON_COMPLETE}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Complete Course</div>
                  <div className="text-sm text-gray-400">Finish entire course</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.COURSE_COMPLETE}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">3-Day Learning Streak</div>
                  <div className="text-sm text-gray-400">Complete lessons 3 days in a row</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.ACADEMY_STREAK_3}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">7-Day Learning Streak 🔥</div>
                  <div className="text-sm text-gray-400">Complete lessons 7 days in a row</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.ACADEMY_STREAK_7}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Tools */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">🛠️ Knight Tools</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Scan Credit Report</div>
                  <div className="text-sm text-gray-400">Upload and analyze report</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.SCAN_REPORT}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Generate Dispute Letter</div>
                  <div className="text-sm text-gray-400">Create dispute using templates</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.GENERATE_DISPUTE}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Track Dispute</div>
                  <div className="text-sm text-gray-400">Add dispute to tracker</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.TRACK_DISPUTE}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Decode Response</div>
                  <div className="text-sm text-gray-400">Analyze bureau response</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.DECODE_RESPONSE}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Upload Document</div>
                  <div className="text-sm text-gray-400">Store file in Vault</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.UPLOAD_DOCUMENT}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Community */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">👥 Community</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Create Post</div>
                  <div className="text-sm text-gray-400">Share with community</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.POST_CREATE}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Quality Post Bonus 🏆</div>
                  <div className="text-sm text-gray-400">Awarded by moderators</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.POST_QUALITY_BONUS}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Comment</div>
                  <div className="text-sm text-gray-400">Reply to posts</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.COMMENT_CREATE}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Receive Like</div>
                  <div className="text-sm text-gray-400">Someone likes your post/comment</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.LIKE_RECEIVE}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Receive Comment</div>
                  <div className="text-sm text-gray-400">Someone comments on your post</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.COMMENT_RECEIVE}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Helpful Vote</div>
                  <div className="text-sm text-gray-400">Post marked "helpful"</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.HELPFUL_VOTE}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Engagement */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">📱 Engagement</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div className="font-bold text-white">Share Post</div>
                <div className="text-knight-gold font-bold">+{points.SHARE_POST}</div>
              </div>
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div className="font-bold text-white">Download Resource</div>
                <div className="text-knight-gold font-bold">+{points.DOWNLOAD_RESOURCE}</div>
              </div>
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div className="font-bold text-white">Download Template</div>
                <div className="text-knight-gold font-bold">+{points.DOWNLOAD_TEMPLATE}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-white">View Tutorial</div>
                <div className="text-knight-gold font-bold">+{points.VIEW_TUTORIAL}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Milestones */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">🏆 Major Milestones</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Items Deleted 🎉</div>
                  <div className="text-sm text-gray-400">Accounts removed from report</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.ITEMS_DELETED}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Victory!</div>
                  <div className="text-sm text-gray-400">Major win in your case</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.VICTORY}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Lawsuit Filed ⚖️</div>
                  <div className="text-sm text-gray-400">Filed legal action</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.LAWSUIT_FILED}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Settlement Reached 🤝</div>
                  <div className="text-sm text-gray-400">Settled your case</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.SETTLEMENT_REACHED}</div>
              </div>
              
              <div className="flex justify-between items-center bg-knight-gold-dark p-3 rounded">
                <div>
                  <div className="font-bold text-white">LAWSUIT WON! 🏆</div>
                  <div className="text-sm text-gray-400">Won judgment against bureau</div>
                </div>
                <div className="text-knight-gold font-bold text-xl">+{points.LAWSUIT_WON}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Social */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">🤝 Referrals & Social</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Send Invite</div>
                  <div className="text-sm text-gray-400">Invite friend to platform</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.INVITE_SENT}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Friend Joins</div>
                  <div className="text-sm text-gray-400">Your referral signs up</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.FRIEND_JOINS}</div>
              </div>
              
              <div className="flex justify-between items-center bg-knight-gold-dark p-3 rounded">
                <div>
                  <div className="font-bold text-white">Successful Referral 🎁</div>
                  <div className="text-sm text-gray-400">Friend completes first form</div>
                </div>
                <div className="text-knight-gold font-bold text-xl">+{points.REFERRAL}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Special Awards */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">💎 Special Awards</h2>
          <Card premium>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Testimonial Approved</div>
                  <div className="text-sm text-gray-400">Your story featured</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.TESTIMONIAL_APPROVED}</div>
              </div>
              
              <div className="flex justify-between items-center border-b border-knight-hover pb-3">
                <div>
                  <div className="font-bold text-white">Beta Tester</div>
                  <div className="text-sm text-gray-400">Test new features</div>
                </div>
                <div className="text-knight-gold font-bold">+{points.BETA_TESTER}</div>
              </div>
              
              <div className="flex justify-between items-center bg-gold-gradient p-4 rounded">
                <div>
                  <div className="font-bold text-black text-lg">MILLER CASE QUALIFIED 💎</div>
                  <div className="text-sm text-black">Qualify for Miller v. TransUnion class</div>
                </div>
                <div className="text-black font-bold text-2xl">+{points.MILLER_CASE_QUALIFY}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* FAQ */}
        <Card>
          <h2 className="text-2xl font-bold text-knight-gold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-bold text-white mb-1">Can I lose points?</div>
              <p className="text-gray-400">No! Points only go up. Even if content is removed, you keep the points.</p>
            </div>
            
            <div>
              <div className="font-bold text-white mb-1">What's the maximum points?</div>
              <p className="text-gray-400">Unlimited! Top users have 50,000+ points.</p>
            </div>
            
            <div>
              <div className="font-bold text-white mb-1">Can I trade points for anything?</div>
              <p className="text-gray-400">Not yet, but we're working on rewards. For now, they're for status and badges.</p>
            </div>
            
            <div>
              <div className="font-bold text-white mb-1">How do moderators award quality bonuses?</div>
              <p className="text-gray-400">Posts with exceptional detail, helpfulness, or inspiration get manually awarded 25 bonus points.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
