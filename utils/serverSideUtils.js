import type Metadata from 'next'

export const MetaDataMateo = (title: string, description: string): Promise<Metadata> => {
    const metadata: Metadata = {
        title: title,
        description: description,
    }

    // Retourne une promesse résolue avec l'objet metadata
    return Promise.resolve(metadata);
};