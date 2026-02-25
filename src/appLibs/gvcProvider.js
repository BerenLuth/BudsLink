import GIRepository from 'gi://GIRepository';

const typelibDir = `${pkg.prefix}/lib/budslink-gvc`;  // eslint-disable-line no-undef
const repo = GIRepository.Repository.dup_default();
repo.prepend_search_path(typelibDir);
repo.prepend_library_path(typelibDir);

export const Gvc = (await import('gi://Gvc')).default;

let control = null;

export function getMixerControl() {
    if (!control) {
        control = new Gvc.MixerControl({name: 'budslink'});
        control.open();
    }
    return control;
}
export const Volume = {getMixerControl};

