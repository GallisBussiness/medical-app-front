import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { FaCheck, FaPhone, FaUserGraduate, FaVoicemail } from 'react-icons/fa';
import { MdNotInterested } from 'react-icons/md';

const useStyles = createStyles((theme) => ({
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));


export function UserInfo({ prenom, nom, telephone, email,sexe,user,formation,apte }) {
  const { classes } = useStyles();
  return (
    <div className="px-5 py-10 bg-slate-50">
      <Group noWrap>
        <Avatar src={`/imgs/${sexe}.svg`} size={94} radius="md" />
        <div>
          <Text size="lg" sx={{ textTransform: 'uppercase' }} weight={700} className={classes.name}>
            {prenom}
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
            {nom}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <FaVoicemail stroke={1.5} size={16} className={classes.name} />
            <Text size="md">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <FaPhone size={16} className={classes.name} />
            <Text size="md">
              {telephone}
            </Text>
          </Group>
          <Group noWrap spacing={10} mt={5}>
            <FaUserGraduate size={16} className={classes.name} />
            <Text size="md">
              {formation}
            </Text>
          </Group>
          <Group noWrap spacing={10} mt={5}>
            <Text size="md">Crée Par : </Text>
            {user ? <Text size="md">
              {user?.prenom} {user?.nom}
            </Text> : <Text size="md">Inconnu </Text>}
          </Group>
          <Group noWrap spacing={10} mt={5}>
            <Text size="md">
              {apte ? <span><FaCheck  className="h-6 w-6 text-green-500 inline"/> Apte</span> : <span><MdNotInterested className="h-6 w-6 text-red-500 inline"/> Inapte</span> }
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}