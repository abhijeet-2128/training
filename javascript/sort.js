let students = [
    {
        firstName: 'Johnny',
        lastName: 'Lee',
        age: 20,
    },

    {
        firstName: 'Anna',
        lastName: 'Zax',
        age: 19,

    },

    {
        firstName: 'Zion',
        lastName: 'Sanches',
        age: 22,

    }
];
students.sort((a, b) => {
    return a.age - b.age;
});
