import { useState } from 'react';
import { Tabs } from '@mantine/core';
import { FaBookMedical, FaFileMedical, FaRegAddressCard } from 'react-icons/fa';

export function EtudiantTab({dossierComponent,consulationComponent,bulletinComponent}) {
  const [activeTab, setActiveTab] = useState('consultation');

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab} className="bg-slate-50 min-h-96">
      <Tabs.List position="center">
        <Tabs.Tab icon={<FaBookMedical />} value="dossier">DOSSIER MEDICAL</Tabs.Tab>
        <Tabs.Tab icon={<FaFileMedical />} value="consultation">CONSULTATIONS</Tabs.Tab>
        <Tabs.Tab icon={<FaRegAddressCard />} value="bulletin">BULLETINS</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="dossier">{dossierComponent}</Tabs.Panel>
      <Tabs.Panel value="consultation">{consulationComponent}</Tabs.Panel>
      <Tabs.Panel value="bulletin">{bulletinComponent}</Tabs.Panel>
    </Tabs>
  );
}