export const validate = (label, rules, value) => {
    let error = "";

    for (const rule of rules.split('|')) {
        if (rule === "required") {
            if (!value) {
                error = `Le champ ${label} est obligatoire`;
                break;
            }
        }

        if (rule.startsWith('min')) {
            const [ , min ] = rule.split(':');
            const intMin = Number(min);

            if (!Number.isNaN(intMin) && value.length < intMin) {
                error = `Le champ ${label} doit contenir au minimum ${intMin} caractères`;
                break;
            }
        }

        if (rule.startsWith('max')) {
            const [ , max ] = rule.split(':');
            const intMax = Number(max);

            if (!Number.isNaN(intMax) && value.length > intMax) {
                error = `Le champ ${label} doit contenir au maximum ${intMax} caractères`;
                break;
            }
        }

        if (rule.startsWith('password')) {
            const regex = /.*[A-Z].*/;

            if (value.match(regex) === null) {
                error = `Le champ ${label} doit contenir au moins une majuscule`;
                break;
            }
        }

        if (rule.startsWith('notIn')) {
            const [ , values ] = rule.split(':');

            if (values.split(',').includes(value)) {
                error = `Le champ ${label} ne doit pas être une des valeurs suivantes: ${values}`;
                break;
            }
        }
    }

    return error;
};
