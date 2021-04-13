export default {
    data() {
        return {
            username: "",
            password: "",
            errors: {},
        };            
    },
    template: `
        <div>
            <header class="container">
            <div class="row">
                <div class="col">
                <h1>Register</h1>
                </div>
            </div>
            </header>
            <main>
            <div class="container">
                {{# errors }}
                <div class="row">
                <div class="col s12">
                    <span class="red-text">{{ error.text }}</span>
                </div>
                </div>
                {{/ errors }}
                <div class="row">
                <form method="POST" action="/register" class="col s12">
                    <div class="row">
                    <div class="input-field col s12 m6 xl4">
                        <input id="username" name="username" type="text" class="validate" autocomplete="off" autofocus required>
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field col s12 m6 xl4">
                        <input id="password" name="password" type="password" class="validate" autocomplete="off" required>
                        <label for="password">Password</label>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col s12">
                        <button type="submit" class="btn purple darken-4">Register</button>
                    </div>
                    </div>
                </form>
                </div>
                <div class="row">
                <div class="col">
                    <p>Already have an account?</p>
                </div>
                </div>
                <div class="row">
                <div class="col">
                    <a href="/login" class="btn purple darken-4">Login</a>
                </div>
                </div>
            </div>
            </main>
        </div>
    `,
}