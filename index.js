const autoCompleteConfig = {
    renderOption: movie => {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title}
        `
    },
    inputValue: movie => { return movie.title },
    fetchData: async (searchTerm) => {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: 'ad7fb8d',
                s: searchTerm,
            },
        });
        if(response.data.Error) {
            return [];
        }
        return response.data.Search;
    },
};

createAutocomplete({
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect: movie => {
        document.querySelector('.tutorial').classList.add('is-hidden');
        return onMovieSelect(movie, '#left-summary');
    },
    ...autoCompleteConfig,
});

createAutocomplete({
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect: movie => {
        document.querySelector('.tutorial').classList.add('is-hidden');
        return onMovieSelect(movie, '#right-summary');
    },
    ...autoCompleteConfig,
});

const onMovieSelect = async (movie, summaryId) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: 'ad7fb8d',
          i: movie.imdbID,
        },
      });

     document.querySelector(summaryId).innerHTML = movieTeplate(response.data);
}

const movieTeplate = movieDetail => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};


