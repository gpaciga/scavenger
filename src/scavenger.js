const Scavenger = config => {

    const GAME_DIV_ID = "scavenger";

    const resetGameDiv = () => {
        const gameDiv = document.getElementById(GAME_DIV_ID);
        $(gameDiv).empty();
        return gameDiv;
    }

    const newForm = callback => {
        const handleSubmit = (form, event) => {
            event.preventDefault(); // dont refresh the page
            callback($(form).serializeArray());
        };

        const form = document.createElement('form');
        form.onsubmit = handleSubmit.bind(this, form);
        return form;
    }

    const newGame = () => {

        const form = newForm(startGame);
        $(form).append(`
            <div class="input-group">
                <input type="text" class="form-control" name="seed" placeholder="Magic Word" />
                <button type="submit" class="btn btn-primary" />GO!</button>
            </div>
        `);

        const gameDiv = resetGameDiv();
        $(gameDiv).append(`<h2>Start your game</h2>`);
        $(gameDiv).append(form);
    }

    const startGame = (input) => {
        const gameDiv = resetGameDiv();
        const form = newForm(newGame);

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

    return {
        newGame: newGame,
    };
};

// only for supporting jest
if (typeof module != 'undefined') {
    module.exports = Scavenger;
}
