export const generateMoviePosition = (position: number) => {
    return `.${ position >= 10 ? position : `0` + position }`;
}
