export const generateMoviePosition = (position: number) => {
    return (position >= 10) ? `.${position.toString()}` : `.0${position}`; // TODO: do not repeat dot
}
