import Heading from '@/components/Heading';
import Image from 'next/image';
import { getReview, getSlugs } from '@/lib/reviews';
import ShareLinkButton from '@/components/ShareLinkButton';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const slugs = await getSlugs();
    // console.log('[ReviewPage] generateStaticParams:', slugs);
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
    const review = await getReview(slug);
    if (!review) {
        notFound();
    }
    return {
        title: review.title,
    };
}

export default async function ReviewPage({ params: { slug } }) {
    const review = await getReview(slug);
    if (!review) {
        notFound();
    }

    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="font-semibold pb-3">{review.subtitle}</p>
            <div className="flex gap-3 items-baseline">
            <p className="italic pb-2">{review.date}</p>
            <ShareLinkButton />
            </div>
            <Image
                src={review.image}
                alt=""
                width="640"
                height="360"
                className="mb-2 rounded"
                priority={true}
            />
            <article
                dangerouslySetInnerHTML={{ __html: review.body }}
                className="max-w-screen-sm prose prose-slate"
            />
        </>
    );
}
