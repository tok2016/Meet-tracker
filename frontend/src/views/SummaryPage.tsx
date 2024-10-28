import { Paper, Typography } from '@mui/material';
import { Summary } from '../utils/types/Summary';

const mockSummary: Summary = {
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
  @/text
  @&/teammate Бараш
  @/task 1. Написать стих на дереве. 2. Застрять на дереве. 3. Сломать скамейку. 4. Надавить на жалость, чтобы Крош простил.
  @&/teammate Крош
  @/task 1. Не мешать Барашу писать стих. 2. Построить из хлама подобие лестницы, чтобы достать Бараша с дерева.
  @&/teammate Ёжик
  @/task 1. Помочь Крошу построить подобие лестницы из хлама. 2. Уронить Бараша с дерева.
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
};

const TopicPlain = ({topic}: {topic: string}) => {
  const subtopics = topic.split('@');

  const theme = subtopics.find((sentence) => sentence.includes('/topic'));
  const start = subtopics.find((sentence) => sentence.includes('/start'));
  const end = subtopics.find((sentence) => sentence.includes('/end'))
  const text = subtopics.find((sentence) => sentence.includes('/text'));

  const tasks = text?.split('&');
  
  return (
    <Paper>
      <Typography variant='h4'>
        {theme} {start} - {end}
      </Typography>
      <Paper>
        {tasks 
          ? <></> 
          : <Typography variant='body1'>
              {text}
            </Typography>};
      </Paper>
    </Paper>
  );
};

const SummaryPage = () => {
  const topics = mockSummary.text.split('$');

  
  return (
    <>
      {topics.map((topic) => (
        <TopicPlain topic={topic}/>
      ))}
    </>
  );
};

export default SummaryPage;
