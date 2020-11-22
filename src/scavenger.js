const GAME_DIV_ID = "scavenger";

export default class Scavenger {

    resetGameDiv() {
        const gameDiv = document.getElementById(GAME_DIV_ID);
        $(gameDiv).empty();
        return gameDiv;
    }

    newForm(callback) {
        const handleSubmit = (form, event) => {
            event.preventDefault(); // dont refresh the page
            callback.bind(this, $(form).serializeArray())();
        };

        const form = document.createElement('form');
        form.onsubmit = handleSubmit.bind(this, form);
        return form;
    }

    newGame() {
        const form = this.newForm(this.startGame);
        $(form).append(`
            <div class="input-group">
                <input type="text" class="form-control" name="seed" placeholder="Magic Word" />
                <button type="submit" class="btn btn-primary" />GO!</button>
            </div>
        `);

        const gameDiv = this.resetGameDiv();
        $(gameDiv).append(`<h2>Start your game</h2>`);
        $(gameDiv).append(form);
    }

    startGame(input) {
        const gameDiv = this.resetGameDiv();
        const form = this.newForm(this.newGame);

        const inputObj = input.reduce((previous, current) => {
            previous[current.name] = current.value;
            return previous;
        }, {});

        $(form).append(`
            <p>The magic word was ${inputObj.seed}</p>
            <input type="submit" class="btn btn-secondary" value="Start over with a new magic word" />
        `);
        $(gameDiv).append(form);
    }
}
