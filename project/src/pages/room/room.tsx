import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import CurrentOffer from '../../components/current-offer/current-offer';
import CardList from '../../components/card-lIst/card-list';
import Map from '../../components/map/map';
import {
  fetchCurrentOfferAction,
  fetchNearOffersAction,
  fetchCommentAction,
  checkAuthAction,
} from '../../store/api-actions';
import LoadingScreen from '../../components/loading-screen/loading-screen';


// Redux
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';


function Room(): JSX.Element {
  const { id } = useParams();
  const roomId = Number(id) - 1;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentOfferAction(id));
    dispatch(fetchNearOffersAction(id));
    dispatch(fetchCommentAction(id));
    dispatch(checkAuthAction());
  }, [dispatch, id]);

  // Получает конкретное предложение
  const currentOffer = useAppSelector((state) => state.getOffer);

  // Получает предложения неподалеку
  const nearOffer = useAppSelector((state) => state.nearOffers);

  // Статус загрузки предложений
  const status = currentOffer && nearOffer;

  // Получает комментарии
  const reviews = useAppSelector((state) => state.reviews);

  // Получает ошибку
  const error = useAppSelector((state) => state.error);

  if (error === `Hotel id ${roomId} does not exist`) {
    return (
      <Navigate to="/not-found" />
    );
  }

  return (
    <>
      <Helmet>
        <title>Старница с предложением номера</title>
      </Helmet>

      {
        status ? (
          <main className="page__main page__main--property">
            <section className="property">
              <CurrentOffer offer={currentOffer} reviews={reviews} roomId={id} />
              <section className="property__map map">
                {
                  nearOffer.length === 0 ? (
                    null
                  ) : (
                    <Map offers={nearOffer} />
                  )
                }
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  <CardList offers={nearOffer} />
                </div>
              </section>
            </div>
          </main>
        ) : (
          <LoadingScreen />
        )
      }
    </>
  );
}

export default Room;
