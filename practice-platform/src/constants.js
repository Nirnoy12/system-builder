export const NODE_TYPES = [
  { id: 'input', lbl: 'Input', col: '#1E293B', hi: false, ho: true },
  { id: 'llm', lbl: 'LLM Step', col: '#2563EB', hi: true, ho: true },
  { id: 'know', lbl: 'Knowledge Retrieval', col: '#7C3AED', hi: true, ho: true },
  { id: 'class', lbl: 'Classifier / Router', col: '#D97706', hi: true, ho: true },
  { id: 'cond', lbl: 'Condition / Branch', col: '#EA580C', hi: true, ho: true },
  { id: 'loop', lbl: 'Loop', col: '#0891B2', hi: true, ho: true },
  { id: 'tool', lbl: 'Tool Call', col: '#0D9488', hi: true, ho: true },
  { id: 'mem', lbl: 'Memory / Context', col: '#6366F1', hi: true, ho: true },
  { id: 'hand', lbl: 'Human Handoff', col: '#DC2626', hi: true, ho: false },
  { id: 'fmt', lbl: 'Output Formatter', col: '#10B981', hi: true, ho: false },
  { id: 'guard', lbl: 'Evaluator / Guardrail', col: '#DB2777', hi: true, ho: true },
  { id: 'retry', lbl: 'Retry / Fallback', col: '#6B7280', hi: true, ho: true },
  { id: 'code', lbl: 'Custom Code', col: '#9333EA', hi: true, ho: true },
  { id: 'merge', lbl: 'Merge / Join', col: '#84CC16', hi: true, ho: true },
  { id: 'note', lbl: 'Note', col: '#EAB308', hi: false, ho: false },
];

export const NODE_PROPERTIES = {
  input: [{ k: 'fields', l: 'Input Fields', t: 'ta', p: 'product_id, channel, region' }],
  llm: [
    { k: 'system', l: 'System prompt *', t: 'ta', p: 'Define the role, task, and constraints for the LLM...' },
    { k: 'user', l: 'User prompt template', t: 'ta', p: 'Use {{variable}} for dynamic values. e.g.\n"Ticket: {{input}}"' },
    { k: 'out', l: 'Output variable name', t: 'inp', p: 'e.g. draftResponse' },
    { k: 'notes', l: 'Notes (optional)', t: 'ta', p: 'Design notes or rationale for this step...' }
  ],
  know: [
    { k: 'src', l: 'Data Source / API', t: 'inp', p: 'DemandAPI / SupplyAPI' },
    { k: 'q', l: 'Query Template', t: 'ta', p: 'Retrieve data' }
  ],
  class: [{ k: 'cats', l: 'Route Categories', t: 'ta', p: 'Schedule\nVenue\nPayment\nAccommodation' }],
  cond: [
    { k: 'cond', l: 'Branch Condition', t: 'inp', p: 'confidence_score > 0.80' }
  ],
  loop: [
    { k: 'iter', l: 'Max Iterations', t: 'inp', p: '3' }
  ],
  tool: [
    { k: 'toolName', l: 'Tool Name', t: 'inp', p: 'e.g. getWeather' },
    { k: 'toolParams', l: 'Tool Parameters', t: 'ta', p: '{"location": "{{region}}"}' }
  ],
  mem: [
    { k: 'memKey', l: 'Memory Key', t: 'inp', p: 'e.g. session_history' }
  ],
  hand: [{ k: 'reason', l: 'Escalation Reason', t: 'ta', p: 'Needs human review' }],
  fmt: [{ k: 'format', l: 'Output Format', t: 'sel', o: ['JSON', 'Plain Text'] }],
  guard: [{ k: 'checks', l: 'Guardrail Checks', t: 'ta', p: 'Safety checks' }],
  retry: [{ k: 'max', l: 'Max Retries', t: 'inp', p: '3' }],
  code: [{ k: 'fn', l: 'Function Code', t: 'ta', p: 'function process() {}' }],
  merge: [{ k: 'strat', l: 'Merge Strategy', t: 'sel', o: ['Combine all'] }],
  note: [{ k: 'txt', l: 'Note', t: 'ta', p: 'Add a comment...' }]
};

export const QUESTION_BANK = {
  default: "Explain the overall architecture and main goal of the workflow you have designed.",
  llm: "You used an LLM Step. How are you engineering the prompt to ensure consistent, constrained output, and what role are you assigning the model?",
  know: "You included Knowledge Retrieval. How does your workflow decide which APIs to call, and what logic handles empty or unexpected retrieved context?",
  class: "You used a Classifier/Router. Walk through the decision logic and categories. How do you handle edge cases that fall outside these categories?",
  cond: "Explain your branching logic. At which stages is confidence evaluated, and what threshold determines the outcome?",
  tool: "You included a Tool Call. What prevents the workflow from making unsafe or recursive tool calls?",
  mem: "You utilized Memory/Context. How are you managing context window limits and ensuring old context doesn't degrade performance?",
  guard: "You implemented an Evaluator/Guardrail. What specific conditions or metrics trigger a failure in this step?",
  hand: "You added Human Handoff. What criteria qualify a situation as needing human escalation?"
};

export function getQuestionsForNodes(nodes) {
  if (!nodes || nodes.length === 0) return [QUESTION_BANK.default];
  
  const presentTypes = new Set(nodes.map(n => n.data?.tid));
  const selectedQuestions = [];
  
  // Always add default overall question
  selectedQuestions.push(QUESTION_BANK.default);

  // Check specific nodes
  for (const type of ['llm', 'know', 'class', 'cond', 'tool', 'mem', 'guard', 'hand']) {
    if (presentTypes.has(type) && selectedQuestions.length < 5) {
      selectedQuestions.push(QUESTION_BANK[type]);
    }
  }

  // If we don't have 5 questions yet, pad them with some general ones based on the brief
  const paddingQuestions = [
    "How does your design handle potential failure points or latency spikes in external steps?",
    "Describe how you handle trade-offs between speed/cost and accuracy for this workflow.",
    "How does your workflow ensure explainability? What information is included in the final output rationale?",
    "If you were to deploy this into production, what would be the first metric you monitor?"
  ];

  let padIdx = 0;
  while (selectedQuestions.length < 5 && padIdx < paddingQuestions.length) {
    selectedQuestions.push(paddingQuestions[padIdx]);
    padIdx++;
  }

  return selectedQuestions;
}
