// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {

  type Lecture = {
    class: string | null;
    batch: string | null;
    branch: string | null;
    floor: string | null;
    lecturer: string | null;
    time: string | null;
    offset: number;
    exam: boolean;
    on_going?: boolean | null;
  };

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
