//import { Summary } from '../utils/types/Summary';
import TopicPlain from '../components/TopicPlain';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { useEffect } from 'react';
import { getSummary } from '../store/summary/summaryThunks';

/*const mockSummary: Summary = {
  id: 1,
  title: 'Встреча 17.12.2023',
  text: (`
  $@/topic Общая информация
  @/start 00:00
  @/end 02:23
  @/text Крош построил скамейку и покрасил её в розовый цвет. После этого у него осталась довольно много краски. Тут как раз пришёл Ёжик, и тот предложил ему что-то покрасить, на что второй дал отказ. Чтобы отмазаться, Ёжик предложил отдать краску Барашу, который в очередной депрессовал из-за того, что у него опять не было вдохновения.
  $@/topic Результаты работы
  @/start 02:24
  @/end 03:12
  @/text Крошу и Ёжику удалось найти того, кому можно было бы сгладить краску. У Бараша так и не получилось написать нормальный стих. Он бомбанул и закрасил все свои листы с провальными попытками.
  $@/topic Задачи
  @/start 03:13
  @/end 06:01
  @/tasks
  &/teammate Бараш
  &/task 1. Написать стих на дереве. 2. Застрять на дереве. 3. Сломать скамейку. 4. Надавить на жалость, чтобы Крош простил.
  &/teammate Крош
  &/task 1. Не мешать Барашу писать стих. 2. Построить из хлама подобие лестницы, чтобы достать Бараша с дерева.
  &/teammate Ёжик
  &/task 1. Помочь Крошу построить подобие лестницы из хлама. 2. Уронить Бараша с дерева.
  `),
  status: 'success',
  date: new Date().toISOString(),
  userId: 1,
  record: {
    id: 1,
    isArchived: false,
    file: '',
    userId: 1
  }
};*/

const MIN_TOPIC_LENGTH = 3;

const SummaryPage = () => {
  const {id} = useParams();

  const {summary} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const rawTopics = summary.text.split('$');

  const topics = rawTopics.map((topic, i) => ({
    id: i,
    topic,
  }));

  useEffect(() => {
    if(id && summary.id.toString() !== id) {
      dispatch(getSummary(id));
    }
  }, [id, dispatch, summary.id]);
  
  return (
    <>
      <Typography variant='h2' marginBottom='25px'>{summary.title}</Typography>
      <Typography variant='h2' marginBottom='25px'>Расшифровка</Typography>
      {topics.map((topic) => (
        topic.topic.length <= MIN_TOPIC_LENGTH || <TopicPlain topic={topic.topic} key={topic.id}/>
      ))}
    </>
  );
};

export default SummaryPage;
