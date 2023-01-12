const axios = require('axios');

module.exports = {
    async abilitiesInformations(ability) {
        try {
            let url = `https://pokeapi.co/api/v2/ability/${ability}`;

            const response = await axios.get(url)

            let data = (response.data);
            return this.getAbility(data);
        }
        catch (err) {
            return err.response.data
        }
    },

    getAbility(ability) {

        let abilityName = ability.name;
        let listOfPokes = ability.pokemon;
        let seed = 0;
        let pokes = [];
        let listMax = 5;

        listOfPokes = this.filterPokeName(listOfPokes);

        if (listOfPokes.length < 5) listMax = listOfPokes.length

        for (let i = 0; i < listMax; i++) {
            seed = Math.round(Math.random() * listOfPokes.length);
            let duplicated = false;

            if (seed == listOfPokes.length) seed--;

            let name = listOfPokes[seed].pokemon.name;

            name = name.charAt(0).toUpperCase()
                + name.slice(1)

            pokes.forEach(item => {
                if (item == name) {
                    duplicated = true;
                    i--;
                }
            });

            if (!duplicated) pokes.push(name);

        }


        informations = {
            "name": abilityName,
            "pokes": pokes
        }

        return informations;
    },

    filterPokeName(array) {

        for (let i = 0; i < array.length; i++) {
            if (array[i].pokemon.name.includes('pikachu-')
                || array[i].pokemon.name.includes('-gmax')
                || array[i].pokemon.name.includes('-totem')
                || array[i].pokemon.name.includes('-busted')
            ) {
                array.splice(i, 1);
                i--;
            }
        }
        return array
    }
}