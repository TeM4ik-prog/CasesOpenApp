export let ChangeColorByRare = (rare) => {
    switch (rare) {
        case 'common':
            return "gray"
            break;
        case 'uncommon':
            return "rgb(0, 96, 181)"
            break;
        case 'epic':
            return "blue"
            break;
        case 'legendary':
            return "rgb(255, 92, 92)"
            break;
    }
}


