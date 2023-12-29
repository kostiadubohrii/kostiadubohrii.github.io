const forms = () => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
    
    const messages = {
        failure: 'An error has just occured...'
    };
    let loadingImage = document.createElement('img');
    loadingImage.src = './assets/slick/ajax-loader.gif';
    loadingImage.id = 'loadingImage';
    
    let completeImage = document.createElement('img');
    completeImage.src = './assets/img/status/complete.gif';
    completeImage.id = 'completeImage';
    completeImage.style.height = '70px';

    let failureImage = document.createElement('img');
    failureImage.src = './assets/img/status/failure.gif';
    failureImage.id = 'failureImage';
    failureImage.style.height = '70px';


    const postData = async (url, data) => {
        document.querySelector('.status').appendChild(loadingImage)

        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
    }

    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    document.querySelector('#loadingImage').remove()
                    document.querySelector('.status').appendChild(completeImage)
                })
                .catch(() =>{
                    document.querySelector('#loadingImage').remove()
                    document.querySelector('.status').appendChild(failureImage)
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        document.querySelector('#completeImage').remove()
                    }, 2100);
                });
        })
    })
}

export default forms;