import { ElementBuilder } from '../utilities/element-builder.js';
import { MainSectionComp } from './main-section.component.js';
import { MovieSectionComp } from './movie-section.component.js';
import { SignUpComp } from './signup.component.js';
import { SliderComp } from './slider.component.js';

export class WrapperComp {
    #wrapperChildren = [
        new MainSectionComp(300).render(), // TODO why not just define components in array literal instead of pushing them everytime?   Corrected

        new MovieSectionComp(
            {
                sectionClass: 'straight-direction-description',
                position: '10',
                name: 'GUARDIANS OF THE GALAXY VOL. 2',
                audioName: 'guardinas-of-the-galaxy-vol-2',
                imgSrc: 'images/guardians.jpg',
                imgAlt: 'guardians of the galaxy',
                about: `While the Awesome Mix Vol. 1 in Guardians of the Galaxy was resonant with a lot of people, it was the soundtrack in Guardians
                        of the Galaxy Vol. 2 that improved on the formula. The first film featured songs that were
                        fun and upbeat but didn't have much to do with the film's story.`
            }
        ).render(),

        new MovieSectionComp(
            {
                sectionClass: 'reverse-direction-description',
                position: '09',
                name: 'JURASSIC PARK',
                audioName: 'jurassic-park',
                imgSrc: 'images/jurassic.jpg',
                imgAlt: 'jurassic park',
                about: `John Williams did a lot of music for many popular franchises. After his work on Star Wars, he would later do the score for
                        Jurassic Park. This dinosaur film was full of epic shots and tense moments that were further
                        brought to life by Williams' music.`
            }
        ).render(),

        new MovieSectionComp(
            {
                sectionClass: 'central-direction-description',
                imgClass: 'star-wars',
                position: '08',
                name: 'STAR WARS: A NEW HOPE',
                audioName: 'star-wars-a-new-hope',
                about: `When Star Wars: A New Hope was released, it introduced many iconic themes that people would recognize decades after. That
                        was thanks to John Williams, who put together the iconic fanfare, the Imperial March, and
                        so many more great tracks.`
            }
        ).render(),

        new SliderComp([
            {
                src: 'videos/star-wars-a-new-hope.mp4',
                imgSrc: 'images/conference_room.jpg',
                imgAlt: 'Dart Waider at the conference room'
            },

            {
                src: 'videos/jurassic-park.mp4',
                imgSrc: 'images/dino_pet.jpg',
                imgAlt: 'petting the dino'
            },

            {
                src: 'videos/guardinas-of-the-galaxy-vol-2.mp4',
                imgSrc: 'images/little_tree.jpg',
                imgAlt: 'little tree presses a button'
            }
        ], 1).render(),

        new MovieSectionComp(
            {
                sectionClass: 'straight-direction-description',
                position: '07',
                name: 'BABY DRIVER',
                audioName: 'baby-driver',
                imgSrc: 'images/baby_driver.jpg',
                imgAlt: 'baby-driver',
                about: `Baby Driver's soundtrack is similar to Guardians of the Galaxy in many ways. It uses a lot of older songs to provide a backdrop
                        to the film's many beats. However, what Edgar Wright did with the music was so far beyond
                        that.`
            }
        ).render(),

        new MovieSectionComp(
            {
                sectionClass: 'reverse-direction-description',
                position: '06',
                name: 'GOODFELLAS',
                audioName: 'goodfellas',
                imgSrc: 'images/goodfellas.jpg',
                imgAlt: 'goodfellas',
                about: `Martin Scorcese's movie Goodfellas remains one of his best to date. The movie deals with gangs, drugs, and everything else
                        in between. It's a crime movie that isn't afraid to deal with the dark side of life. Going
                        along with every scene is a great soundtrack full of hand-picked songs that compliment every
                        moment they appear in.`
            }
        ).render(),

        new MovieSectionComp(
            {
                sectionClass: 'central-direction-description',
                imgClass: 'runner',
                position: '05',
                name: 'BLADE RUNNER',
                audioName: 'blade-runner',
                about: `It's astounding that Blade Runner didn't become as popular as other movies released in its time. It arguably has one of the
                        best soundtracks in movie history, with every tune being a perfect match with the action
                        on-screen.`
            }
        ).render(),

        new SliderComp([
            {
                src: 'videos/blade-runner.mp4',
                imgSrc: 'images/bladerunner.jpg',
                imgAlt: 'bladerunner heroes'
            },

            {
                src: 'videos/goodfellas.mp4',
                imgSrc: 'images/culture.jpg',
                imgAlt: 'high buildings'
            },

            {
                src: 'videos/baby-driver.mp4',
                imgSrc: 'images/Baby-Driver_driver.jpg',
                imgAlt: 'driver'
            }
        ], 1).render(),

        new MovieSectionComp(
            {
                sectionClass: 'straight-direction-description',
                position: '04',
                name: 'O BROTHER, WHERE ART THOU?',
                audioName: 'o-brother-where-art-thou',
                imgSrc: 'images/o-brother.jpg',
                imgAlt: 'o brother where art thou',
                about: `O Brother, Where Art Thou? is a movie that fires on all cylinders. It takes place in the Great Depression and involves a
                        group of convicts who go on a wild journey to find a treasure of sorts. With this film based
                        in a stylistic period in history, the soundtrack was designed to match it.`
            }
        ).render(),

        new MovieSectionComp(
            {
                sectionClass: 'reverse-direction-description',
                position: '03',
                name: '2001: A SPACE ODYSSEY',
                audioName: '2001-a-space-odyssey',
                imgSrc: 'images/davebowman.jpg',
                imgAlt: 'space odyssey',
                about: `The movie tries very hard to sell the idea of what space exploration would be like, and its themes of isolation and sophistication
                        are further enhanced by its soundtrack. 2001: A Space Odyssey makes use of classical themes
                        and motifs to narrow down a tone that makes the movie feel all its own.`
            }
        ).render(),

        new MovieSectionComp(
            {
                sectionClass: 'central-direction-description',
                imgClass: 'godfuther',
                position: '02',
                name: 'THE GODFATHER',
                audioName: 'the-godfather',
                about: `The Godfather is one of cinema's best works. There are so many pieces in that movie that just work, and the soundtrack is
                        part of it. Because the movie deals with crime, gangs, and the works, the music is designed
                        to reflect that.`
            }
        ).render(),

        new SliderComp([
            {
                src: 'videos/o-brother-where-art-thou.mp4',
                imgSrc: 'images/o-brother-image.jpg',
                imgAlt: 'confess before the end'
            },

            {
                src: 'videos/the-godfather.mp4',
                imgSrc: 'images/group33.jpg',
                imgAlt: 'gungsters discussing a deal'
            },

            {
                src: 'videos/2001-a-space-odyssey.mp4',
                imgSrc: 'images/amanda.jpg',
                imgAlt: 'amanda from a space odyssey'
            }
        ], 1).render(),

        new MovieSectionComp(
            {
                sectionClass: 'straight-direction-description',
                position: '01',
                name: 'THE LORD OF THE RINGS',
                audioName: 'the-lord-of-the-rings',
                imgSrc: 'images/frodo.jpg',
                imgAlt: 'Frodo and the ring',
                about: `Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy
                        remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference
                        with Tolkien's detailed descriptions, Howard Shore had to match those visuals with music
                        all his own.`
            }
        ).render(),

        new SignUpComp().render()
    ];

    render() {
        return new ElementBuilder('main').setChildren(...this.#wrapperChildren).build();
    }
}
