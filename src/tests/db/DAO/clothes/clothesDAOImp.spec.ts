import ClothesDAOImp from '@DAOImp/clothes/ClothesDAOImp';
import IClothesModel from '@models/IClothesModel';

const makeDAOImp = (): ClothesDAOImp => new ClothesDAOImp();

describe('Clothes DAO Implementation tests', () => {
  const clothes: IClothesModel = {
    id: 1,
    name: 'Blue shirt',
    quantity: 2,
    value: 15.99,
  };

  test('Should call updateClothes function with correct values', async () => {
    const dao = makeDAOImp();

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'update').mockImplementationOnce(jest.fn());

    await dao.updateClothes(clothes);

    const { id, ...rest } = clothes;
    expect(spy).toHaveBeenCalledWith({
      where: {
        id,
      },

      data: {
        ...rest,
      },
    });
  });
});
