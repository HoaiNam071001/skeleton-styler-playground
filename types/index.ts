// --- Types Definitions ---
export interface MethodInfo {
  name: string;
  args: string;
}

export interface DocCategories {
  style: MethodInfo[];
  builder: MethodInfo[];
  staticMethods: MethodInfo[];
}
export interface ToastState {
  msg: string;
  show: boolean;
}
