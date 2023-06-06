export const validate = (name, value) => {
    let error = "";

    switch (name) {
        case "name":
            if (!value.trim()) {
                error = "Breed name is required";
            }
            break;
        case "height":
            if (!value.trim()) {
                error = "Height is required";
            } else if (!/^(\d{1,3})\s-\s(\d{1,3})$/.test(value)) {
                error =
                    "Invalid height format. Use 'number - number' (for example, '10 - 100')";
            }
            break;
        case "weight":
            if (!value.trim()) {
                error = "Weight is required";
            } else if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
                error =
                    "Invalid weight format. Use 'number - number' (for example, '5 - 70')";
            }
            break;
        case "age":
            if (!value.trim()) {
                error = "Age is required";
            } else if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
                error =
                    "Invalid age format. Use 'number - number' (for example, '1 - 15')";
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
        default:
            break;
    }

    return error;
};  