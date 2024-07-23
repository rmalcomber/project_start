export interface Scheme {
  name: string;
  title: string;
  version: string;
  description: string;
  steps: Step[];
  options?: Option[];
}

export interface Option {
  title: string;
  description: string;
  children?: Child[];
  steps?: Step[];
}

export interface Child {
  title: string;
  value: string;
  steps: Step[];
}

export interface Step {
  order: number;
  title: string;
  type: string;
  command: string;
  binary?: string;
  path?: string;
}

export interface Process {
  index: number;
  name: string;
  steps: Step[];
}

export interface Config {
  STARTDIR: string;
  WORKDIR: string;
  VERBOSE: boolean;
}
