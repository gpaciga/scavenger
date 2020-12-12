import countdown from './countdown';

const items = require('./items');
const chooser = require('./chooser');

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
            <div class="input-group mb-3">
                <input type="text" class="form-control" name="seed" placeholder="Magic Word" />
                <button type="submit" class="btn btn-primary" />GO!</button>
                <button type="button" class="btn btn-link" data-toggle="collapse" data-target="#advanced-options" aria-expanded="false" aria-controls="advanced-options">
                    Advanced Options
                </button>
            </div>
            <div class="collapse" id="advanced-options">
            <div class="form-group row mb-3">
                <label class="col-sm-4 col-form-label" for="limit">Number of items</label>
                <div class="col-sm-8">
                <input class="form-control" type="number" name="limit" id="limit" min="3" max="20" value="5">
                </div>
            </div>
            <div class="form-group row mb-3">
                <label class="col-sm-4 col-form-label" for="superlatives">Use superlatives</label>
                <div class="col-sm-8">
                <input class="" type="checkbox" name="superlatives" id="superlatives" />
                </div>
            </div>
            <div class="form-group row mb-3">
                <label class="col-sm-4 col-form-label" for="superlatives-chance">Chance of a superlative being used</label>
                <div class="col-sm-8">
                <input class="form-control" type="range" name="superlativeChance" id="superlatives-chance" min="0" max="1" step="0.01" value="0.25" />
                </div>
            </div>
        `);

        const gameDiv = this.resetGameDiv();
        $(gameDiv).append(`<h2>Start your game</h2>`);
        $(gameDiv).append(form);
    }

    startGame(input) {
        const gameDiv = this.resetGameDiv();

        const inputOptions = input.reduce((previous, current) => {
            previous[current.name] = current.value;
            return previous;
        }, {});

        $(gameDiv).append(`<p>The magic word was ${inputOptions.seed}</p>`);
        $(gameDiv).append(`<h2>Find these items!</h2>`);
        const chosenItems = chooser(
            items,
            inputOptions
        );
        chosenItems.forEach(item => {
            $(gameDiv).append(`
                <div class="row">
                    <div class="col-1">
                        <input type="checkbox" id="${item.name}" />
                    </div>
                    <div class="col">
                        <label for id="${item.name}">${item.name}</label>
                    </div>
                </div>
            `);
        });

        $(gameDiv).append(`<div id="countdown" class="col-4 card justify-content-center"></div>`);
        countdown(5, 0);

        $(gameDiv).append(`
            <a class="btn btn-secondary" href="index.html" />Start over with a new magic word</a>
        `);
    }
}
