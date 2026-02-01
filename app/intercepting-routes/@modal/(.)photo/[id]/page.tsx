import { Modal } from '../../../_components/modal';
import { PhotoDetails } from '../../../_components/photo-details';
import { products } from '../../../_data/products';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function InterceptedPhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <Modal>
      <PhotoDetails product={product} isModal />
    </Modal>
  );
}
