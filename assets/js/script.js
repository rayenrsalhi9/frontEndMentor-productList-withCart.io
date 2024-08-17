async function fetchData() {
    try {

        const response = await fetch('../../data.json');
        console.log(response);
        if (response.ok !== false) {

            const data = await response.json();

            console.log(data);
            console.log(data[0]);
            console.log(data[0].image);
            console.log(data[0].image.desktop);
            console.log(typeof data[0].image.desktop);

            for (let i in data) {

                let image = document.createElement('img');
                image.src = data[i].image.desktop;
                image.alt = 'product image';

                document.body.appendChild(image);
            }
        }

    } catch (error) {
        console.error(error);
    }
}

fetchData();