import Card from './Card';
import Button from './Button';

interface KnightAICardProps {
  tool: 'scanner' | 'dispute' | 'tracker' | 'decoder' | 'vault';
  isPrime: boolean;
}

const AI_FEATURES = {
  scanner: {
    icon: '🤖',
    title: 'Knight AI Scanner',
    features: [
      'Advanced violation detection using ML patterns',
      'Predicts bureau response likelihood',
      'Suggests strongest dispute angles',
      'Historical success rate analysis',
      'Personalized recommendations based on your credit history',
    ],
  },
  dispute: {
    icon: '✨',
    title: 'Knight AI Writer',
    features: [
      'AI-enhanced letter composition',
      'Automatically cites relevant case law',
      'Tone optimization for maximum impact',
      'Suggests additional FCRA violations to include',
      'Predicts which arguments will work best',
    ],
  },
  tracker: {
    icon: '🎯',
    title: 'Knight AI Tracker',
    features: [
      'Predictive deadline management',
      'Smart reminder scheduling',
      'AI-powered follow-up recommendations',
      'Success probability analysis',
      'Next-action suggestions',
    ],
  },
  decoder: {
    icon: '🧠',
    title: 'Knight AI Decoder',
    features: [
      'Advanced response analysis using NLP',
      'Detects hidden bureau tactics',
      'Suggests counter-arguments automatically',
      'Identifies escalation opportunities',
      'Translates legalese into plain English',
    ],
  },
  vault: {
    icon: '📂',
    title: 'Knight AI Organizer',
    features: [
      'Auto-categorizes uploaded documents',
      'OCR text extraction from images',
      'Smart document suggestions',
      'Duplicate detection',
      'Intelligent search across all files',
    ],
  },
};

export default function KnightAICard({ tool, isPrime }: KnightAICardProps) {
  const aiFeature = AI_FEATURES[tool];
  
  if (isPrime) {
    return (
      <Card premium className="mb-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{aiFeature.icon}</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gradient-gold mb-2">{aiFeature.title} Active</h3>
            <p className="text-gray-300 text-sm mb-4">
              Your Premium AI assistant is analyzing everything in real-time.
            </p>
            <ul className="space-y-2">
              {aiFeature.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-knight-gold mt-1">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6 bg-gradient-to-r from-knight-hover to-knight-black border-2 border-knight-gold-dark">
      <div className="flex items-start gap-4">
        <div className="text-5xl opacity-50">{aiFeature.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{aiFeature.title} 🔒</h3>
          <p className="text-gray-400 text-sm mb-4">
            Upgrade to Prime to unlock advanced AI features that enhance this tool:
          </p>
          <ul className="space-y-2 mb-4">
            {aiFeature.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm opacity-60">
                <span className="text-knight-gold mt-1">★</span>
                <span className="text-gray-400">{feature}</span>
              </li>
            ))}
            <li className="text-sm text-gray-500">+ {aiFeature.features.length - 3} more AI features...</li>
          </ul>
          <Button href="/pricing" size="sm" className="shimmer">
            Unlock Knight AI - $19.99/mo
          </Button>
        </div>
      </div>
    </Card>
  );
}
