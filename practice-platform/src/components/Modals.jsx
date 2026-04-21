import React from 'react';
import { BookOpen, X, Check, CheckCircle2 } from 'lucide-react';

export function ChallengeBriefModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <BookOpen size={20} color="#4F46E5" />
            Retail Promotion Optimisation Agent
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div className="brief-section">
            <div className="brief-tag">Scenario</div>
            <p>RetailCo, a leading consumer goods company, runs frequent promotional campaigns across multiple retail channels (modern trade, e-commerce, and general trade) to increase sales volume, improve product visibility, and clear excess inventory. However, promotion planning is currently inefficient: some products are over-promoted (reducing margins without incremental sales); some high-potential products are under-promoted (missing revenue opportunities); promotions are applied uniformly across stores ignoring local demand differences, and channels compete for limited promotional budgets. Discounts and promotional slots are limited resources — excessive promotions can lead to brand dilution and customer fatigue, some products have supply constraints making aggressive promotion risky, and retrieving detailed demand, supply, and channel data incurs latency.</p>
          </div>
          
          <div className="brief-section">
            <div className="brief-tag">Problem Statement</div>
            <p style={{ marginBottom: '12px' }}>Design a GenAI workflow that receives a promotion planning input (product ID, channel, region, and basic context) and selectively calls relevant APIs to gather additional signals.</p>
            <p style={{ marginBottom: '12px' }}>Using the retrieved data, the workflow should evaluate promotion effectiveness across demand, supply, and channel signals, use confidence-based logic to determine whether additional data is required, prioritise products and channels for promotion, determine the appropriate strategy (increase, maintain, reduce, avoid), and generate a clear rationale.</p>
            <p>
              <strong>Input includes product ID, channel, and region plus initial structured signals:</strong><br />
              — Current Promotion Level: High / Medium / Low / None<br />
              — Inventory Status: Excess / Adequate / Limited / Stock risk
            </p>
          </div>

          <div className="brief-section">
            <div className="brief-tag">Constraints</div>
            <div className="constraint-card">
              <div>
                <div className="constraint-title">⚠ Selective API Usage</div>
                <div className="constraint-desc">The workflow must decide which APIs to call and when based on the input signals and intermediate confidence. Calling all APIs blindly will be penalised.</div>
              </div>
            </div>
            <div className="constraint-card">
              <div>
                <div className="constraint-title">⚠ Confidence-Based Branching</div>
                <div className="constraint-desc">At each decision stage, the system must evaluate its confidence. High confidence proceeds to recommendation; low confidence triggers additional API calls.</div>
              </div>
            </div>
            <div className="constraint-card">
              <div>
                <div className="constraint-title">⚠ Supply-Demand Trade-off</div>
                <div className="constraint-desc">The system must balance promoting high-demand products against avoiding promotion when supply is limited.</div>
              </div>
            </div>
            <div className="constraint-card">
              <div>
                <div className="constraint-title">⚠ Over-Promotion Risk</div>
                <div className="constraint-desc">High promotion frequency may lead to margin loss. The workflow must detect over-promotion signals and recommend reduction or avoidance.</div>
              </div>
            </div>
            <div className="constraint-card">
              <div>
                <div className="constraint-title">⚠ Explainability</div>
                <div className="constraint-desc">Every recommendation must include a clear rationale of which APIs were called, why they were called, and how signals influenced the strategy.</div>
              </div>
            </div>
          </div>

          <div className="brief-section">
            <div className="brief-tag">Success Criteria</div>
            <div className="success-criteria"><Check className="icon" size={16} /> APIs are called selectively based on input signals and intermediate confidence.</div>
            <div className="success-criteria"><Check className="icon" size={16} /> Promotion decisions are based on multiple signals.</div>
            <div className="success-criteria"><Check className="icon" size={16} /> Products and channels are prioritised logically.</div>
            <div className="success-criteria"><Check className="icon" size={16} /> Promotion strategy is determined consistently for similar inputs.</div>
            <div className="success-criteria"><Check className="icon" size={16} /> Supply constraints are checked.</div>
            <div className="success-criteria"><Check className="icon" size={16} /> Over-promotion risk is detected and handled.</div>
            <div className="success-criteria"><Check className="icon" size={16} /> Trade-offs between competing signals are explicitly addressed.</div>
            <div className="success-criteria"><Check className="icon" size={16} /> Unnecessary API calls are avoided.</div>
            <div className="success-criteria"><Check className="icon" size={16} /> A clear, structured rationale is generated for each decision.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SubmitModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '440px' }}>
        <div className="modal-header" style={{ padding: '16px 20px' }}>
          <div className="modal-title">Submit Your Solution</div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body" style={{ padding: '20px' }}>
          <p style={{ color: '#4b5563', marginBottom: '16px', fontWeight: 500 }}>Before submitting, verify that:</p>
          <div className="success-criteria"><span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span> Your workflow nodes are connected end-to-end</div>
          <div className="success-criteria"><span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span> You have addressed all 5 confidence & branching constraints</div>
          <div className="success-criteria"><span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span> All 5 reflection questions have been answered</div>
          <div className="success-criteria"><span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span> Your output includes a clear rationale</div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button className="btn" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Go Back</button>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={onConfirm}>Confirm Submission</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SuccessModal({ isOpen, onContinue }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} style={{ zIndex: 1200 }}>
      <div className="modal-content" style={{ maxWidth: '400px' }}>
        <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
          <CheckCircle2 color="#10b981" size={64} style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: '20px', marginBottom: '12px', color: '#111827' }}>Practice Session Submitted!</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6, marginBottom: '28px' }}>
            Great work completing the practice challenge. Review your workflow and reflection answers carefully — look for gaps in confidence branching, API selectivity, and explainability before the real round.
          </p>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onContinue}>
            Continue Practising
          </button>
        </div>
      </div>
    </div>
  );
}
