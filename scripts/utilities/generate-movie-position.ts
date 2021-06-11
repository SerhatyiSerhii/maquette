export const generateMoviePosition = (position: number) => {
    return (position >= 10) ? `.${position.toString()}` : `.0${position}`; // TODO: better to include dot here   Corrected
}
