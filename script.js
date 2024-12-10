const jobList = async () => {
    try {
        const listMain = document.getElementById('list');
        const response = await fetch('data.json');
        const jobs = await response.json();

        jobs.forEach((element) => {
            const job = document.createElement('div');
            job.className = 'listitem';
            job.style.position = 'relative';

            const isNew = element.new;
            const isFeatured = element.featured;

            if (isNew && isFeatured) {
                job.classList.add('highlighted');
            }

            job.innerHTML = `
                <div class="item-left">
                    <img src="${element.logo}" alt="" id="logo">

                    <div class="desc">
                        <div class="desc-top">
                            <p id="company">${element.company}</p>
                            <span id="new" style="display: ${isNew ? 'flex' : 'none'};">
                                ${isNew ? 'NEW!' : ''}
                            </span>
                            <span id="featured" style="display: ${isFeatured ? 'flex' : 'none'};">
                                ${isFeatured ? 'FEATURED' : ''}
                            </span>
                        </div>

                        <h1 id="position">${element.position}</h1>

                        <div class="desc-bottom">
                            <p id="postedAt">${element.postedAt}</p>
                            <span>.</span>
                            <p id="contract">${element.contract}</p>
                            <span>.</span>
                            <p id="location">${element.location}</p>
                        </div>
                    </div>
                </div>
                <div class="item-right" id="filter">
                    <p id="role">${element.role}</p>
                    <p id="level">${element.level}</p>
                </div>
            `;

            const filter = job.querySelector('#filter');

            element.languages.forEach((lang) => {
                const language = document.createElement('p');
                language.textContent = lang;
                filter.appendChild(language);
            });

            element.tools.forEach((tool) => {
                const toolElement = document.createElement('p');
                toolElement.textContent = tool;
                filter.appendChild(toolElement);
            });

            listMain.appendChild(job);
        });
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
};

jobList();
