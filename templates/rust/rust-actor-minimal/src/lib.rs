use bindings::*;
use exports::pack::name::api::*;

/// This is one of any number of data types that our application
/// uses. Golem will take care to persist all application state,
/// whether that state is local to a function being executed or
/// global across the entire program.
struct State {
    total: u64,
}

/// This holds the state of our application.
/// It is a global variable, which Rust doesn't like, so
/// we use `with_state` to access or update the global variable, so we
/// can avoid `unsafe` noise.
static mut STATE: State = State {
    total: 0
};

fn with_state<T>(f: impl FnOnce(&mut State) -> T) -> T {
    unsafe { f(&mut STATE) }
}

struct ComponentNameImpl;

impl Api for ComponentNameImpl {
    fn add(value: u64) {
        with_state(|state| state.total += value);
    }

    fn get() -> u64 {
        with_state(|state| state.total)
    }
}

bindings::export!(ComponentNameImpl);