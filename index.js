const defaultRecipes = [{
        title: "Cheese Quesidilla",
        mealType: "Lunch",
        servingSize: 1,
        difficulty: "easy",
        ingredients: [{
                item: "cheese",
                amount: "1/4 cup"
            },
            {
                item: "tortilla",
                amount: "1"
            },
            {
                item: "olive oil",
                amount: "1/2 tsp"
            }
        ],
        preparation: [
            "Turn on oven burner to medium-low heat.",
            "Add olive oil to medium size pan.",
            "Place tortilla in pan and rotate to spread oil on underside of tortilla.",
            "Make an even layer of cheese on 1/2 of the tortilla.",
            "Once underside of tortilla is a nice brown, fold over the non-cheese side.",
            "Cook for 3 minutes, flipping if needed.",
            "Remove torilla from pan once cheese has melted."
        ]
    },
    {
        title: "Yogurt with Granola",
        mealType: "Breakfast",
        servingSize: 1,
        difficulty: "easy",
        ingredients: [{
                item: "Yogurt",
                amount: "150g"
            },
            {
                item: "Granola",
                amount: "50g"
            }
        ],
        preparation: [
            "Place 150g of yogurt into a bowl.",
            "Pour 50g of granola on top of yogurt."
        ]
    }
];

const jsonDefaultRecipes = JSON.stringify(defaultRecipes);

console.log(defaultRecipes);