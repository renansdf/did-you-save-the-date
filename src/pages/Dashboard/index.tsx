import React, { useEffect, useCallback, useState } from 'react';
import { Container } from './styles';
import api from '../../services/api';
import photoScoreCalculation from '../../utils/photoScoreCalculation';

interface IUserMedia {
  media_type: string;
  media_url: string;
  timestamp: string;
}

interface IUserMediaRequest {
  data: IUserMedia[];
}

interface IScore {
  value: number;
}

const Dashboard: React.FC = () => {

  const [userMedia, setUserMedia] = useState<IUserMedia[]>();
  const [currentMedia, setCurrentMedia] = useState<IUserMedia>({} as IUserMedia);
  const [score, setScore] = useState<IScore[]>([]);
  const [accumulator, setAccumulator] = useState<number>(0);

  const getUserMedia = useCallback(async () => {
    const userMediaRequest: IUserMediaRequest = await api.get('/data');
    const filteredMedia = userMediaRequest.data.filter(media => {
      return media.media_type === 'IMAGE';
    });
    setUserMedia(filteredMedia);
  }, []);

  const handleNextMedia = useCallback(() => {
    if (userMedia) {
      const selectedMedia = userMedia[Math.floor(Math.random() * userMedia.length)];
      setCurrentMedia(selectedMedia);

      setUserMedia(
        userMedia.filter(media => {
          return media.timestamp !== selectedMedia.timestamp
        })
      );
    }
  }, [userMedia]);

  const handleGameStep = useCallback((event) => {
    event.preventDefault();
    const photoScore = photoScoreCalculation({
      timestamp: currentMedia.timestamp,
      day: event.target.day.value,
      month: event.target.month.value,
      year: event.target.year.value
    });
    setScore([...score, { value: photoScore }]);
    setAccumulator(accumulator + photoScore);
    handleNextMedia();
  }, [handleNextMedia, currentMedia.timestamp, score, accumulator]);

  useEffect(() => {
    getUserMedia();
  }, [getUserMedia]);


  return (
    <Container>
      <h1>Dashboard</h1>
      <h2>Score: {accumulator}</h2>
      <button onClick={handleNextMedia}>Start</button>
      {currentMedia.timestamp &&
        <form method="POST" onSubmit={handleGameStep}>
          <img src={currentMedia.media_url} alt={currentMedia.timestamp} />
          <input name="day" type="number" placeholder="00" />
          <input name="month" type="number" placeholder="00" />
          <input name="year" type="number" placeholder="0000" />
          <button type="submit">Next</button>
        </form>
      }
    </Container>
  )
};

export default Dashboard;
