export const validate = (name, value, input) => {
    let error = "";

    switch (name) {
        case "name":
            if (!value.trim()) {
                error = "Breed name is required";
            } else if (!/^[A-Za-z ]+$/.test(value)) {
                error = "Breed name should only contain letters";
            }
            break;
        case "height":
            if (!value.trim()) {
                error = "Height is required";
            } else if (!/^(\d{1,3})\s-\s(\d{1,3})$/.test(value)) {
                error =
                    "Invalid height format. Use 'number - number' (for example, '10 - 100')";
            } else {
                const [minHeight, maxHeight] = value.split(" - ").map(Number);
                if (minHeight >= maxHeight) {
                    error = "First value must be smaller than the second value";
                }
            }
            break;
        case "weight":
            if (!value.trim()) {
                error = "Weight is required";
            } else if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
                error =
                    "Invalid weight format. Use 'number - number' (for example, '5 - 70')";
            } else {
                const [minWeight, maxWeight] = value.split(" - ").map(Number);
                if (minWeight >= maxWeight) {
                    error = "First value must be smaller than the second value";
                }
            }
            break;
        case "age":
            if (!value.trim()) {
                error = "Age is required";
            } else if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
                error =
                    "Invalid age format. Use 'number - number' (for example, '1 - 15')";
            } else {
                const [minAge, maxAge] = value.split(" - ").map(Number);
                if (minAge >= maxAge) {
                    error = "First value must be smaller than the second value";
                }
            }
            break;
        case "image":
            if (!value.trim()) {
                error = "Image URL is required";
            } else if (value.length > 200) {
                error = "Image URL cannot exceed 200 characters";
            } else if (!/^https?:\/\/\S+$/.test(value)) {
                error = "invalid image url";
            }
            break;
        case "temperament":
            if (input.temperament.length === 0) {
                error = "Please select at least one temperament";
            }
            break;
        default:
            break;
    }

    return error;
};  