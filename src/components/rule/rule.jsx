import React from 'react';
import { Modal, Button, Accordion } from 'react-bootstrap';
import * as Rules from './TextRules';
export default function RulesModal({ show, onClose }) {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Правила игры</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Добро пожаловать в захватывающую игру с палочками! Вот как в неё играть:</p>
          <Accordion>
            <Rules.GeneralRulesItem />
            <Rules.Mode1RulesItem />
            <Rules.Mode2RulesItem />
            <Rules.Mode3RulesItem />
            <Rules.Mode4RulesItem />
            <Rules.Mode5RulesItem />
            <Rules.GoalRulesItem/>
            <Rules.SettingsInfoItem/>
          </Accordion>
        </Modal.Body>
      </Modal>
    );
};
