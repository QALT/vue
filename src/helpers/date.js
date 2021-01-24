export const withHumanDates = (fields, degrees) => {
    return degrees.map(degree => {
        return Object.fromEntries(Object.entries(degree).map(([field, value]) => {
            if (fields.includes(field)) {
                return [field, new Date(value).toLocaleDateString("fr-FR")];
            }

            return [field, value];
        }));
    });
};
