import { Container } from '@/components/shared';
import { Filters } from '@/components/shared/filters';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { Title } from '@/components/shared/title';
import { TopBar } from '@/components/shared/top-bar';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-14">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Все"
                items={[
                  {
                    id: 1,
                    name: 'Пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11ee7d61bb2bd856bd5dfd71fb7d4210.avif',
                    items: [{ price: 500 }],
                  },
                  {
                    id: 2,
                    name: 'Пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11ee7d61bb2bd856bd5dfd71fb7d4210.avif',
                    items: [{ price: 500 }],
                  },
                  {
                    id: 3,
                    name: 'Пицца',
                    imageUrl: '/pizza.png',
                    items: [{ price: 500 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Мясные"
                items={[
                  {
                    id: 1,
                    name: 'Мясные',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11ee7d61bb2bd856bd5dfd71fb7d4210.avif',
                    items: [{ price: 500 }],
                  },
                  {
                    id: 2,
                    name: 'Пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11ee7d61bb2bd856bd5dfd71fb7d4210.avif',
                    items: [{ price: 500 }],
                  },
                  {
                    id: 3,
                    name: 'Пицца',
                    imageUrl: '/pizza.png',
                    items: [{ price: 500 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
