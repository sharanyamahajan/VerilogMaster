
export type TopicCategory = 'Basics' | 'Modeling' | 'Core Concepts' | 'Circuits' | 'Verification';

export type ViewType = 'tutorial' | 'circuit' | 'page';

export interface Tutorial {
  id: string;
  title: string;
  category: TopicCategory;
  description: string;
  content: string;
  codeSnippet?: string;
}

export interface Circuit {
  id: string;
  name: string;
  category: 'Combinational' | 'Sequential' | 'Basic Gates';
  explanation: string;
  verilogCode: string;
  testbenchCode?: string;
}
