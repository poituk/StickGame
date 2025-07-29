import { Accordion } from 'react-bootstrap';

export const GeneralRulesItem = () => (
  <Accordion.Item eventKey="0">
    <Accordion.Header>🎮 Основные правила игры</Accordion.Header>
    <Accordion.Body>
      <div className="rule-section">
        <p>Перед вами ряд из <strong>5-50 палочек</strong>. Игроки ходят по очереди:</p>
        <ul>
          <li>За ход нужно взять палочки по выбранным правилам</li>
          <li>Проигрывает тот, кто <strong>не может сделать ход!</strong></li>
          <li>Последний, кто взял палочки — победитель! 🏆</li>
        </ul>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);

export const Mode1RulesItem = () => (
  <Accordion.Item eventKey="1">
    <Accordion.Header>1️⃣ Стандартный режим</Accordion.Header>
    <Accordion.Body>
      <div className="game-mode">
        <p><strong>Можно взять от 1 до k любых палочек</strong> (даже не рядом!)</p>
        <div className="example">
          <p>Пример: при k=3 можно взять:</p>
          <ul>
            <li>1 любую палочку</li>
            <li>2 любые палочки</li>
            <li>3 любые палочки</li>
          </ul>
        </div>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);

export const Mode2RulesItem = () => (
  <Accordion.Item eventKey="2">
    <Accordion.Header>2️⃣ Диапазонный режим</Accordion.Header>
    <Accordion.Body>
      <div className="game-mode">
        <p><strong>Можно взять от a до b любых палочек</strong></p>
        <div className="example">
          <p>Пример: при a=2 и b=4 можно взять:</p>
          <ul>
            <li>2 палочки</li>
            <li>3 палочки</li>
            <li>4 палочки</li>
          </ul>
        </div>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);

export const Mode3RulesItem = () => (
  <Accordion.Item eventKey="3">
    <Accordion.Header>3️⃣ Режим "Рядом"</Accordion.Header>
    <Accordion.Body>
      <div className="game-mode">
        <p><strong>Можно взять от 1 до k только подряд идущих палочек</strong></p>
        <div className="example">
          <p>Пример: ||| ||</p>
          <ul>
            <li>Можно взять 1, 2 или 3 палочки из левой группы</li>
            <li>Можно взять 1 или 2 палочки из правой группы</li>
            <li><strong>Нельзя</strong> взять 4 палочки!</li>
          </ul>
        </div>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);

export const Mode4RulesItem = () => (
  <Accordion.Item eventKey="4">
    <Accordion.Header>4️⃣ Комбинированный режим</Accordion.Header>
    <Accordion.Body>
      <div className="game-mode">
        <p><strong>Можно взять от a до b только подряд идущих палочек</strong></p>
        <div className="example">
          <p>Пример: при a=2, b=3 можно взять:</p>
          <ul>
            <li>2 подряд идущие палочки</li>
            <li>3 подряд идущие палочки</li>
            <li><strong>Нельзя</strong> взять 1 или 4 палочки!</li>
          </ul>
        </div>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);

export const Mode5RulesItem = () => (
  <Accordion.Item eventKey="5">
    <Accordion.Header>5️⃣ Особый режим (Классика!)</Accordion.Header>
    <Accordion.Body>
      <div className="game-mode">
        <p>Можно взять:</p>
        <ul>
          <li><strong>1 любую</strong> палочку</li>
          <li><strong>2 любые</strong> палочки</li>
          <li><strong>3 подряд идущие</strong> палочки</li>
        </ul>
        <div className="example">
          <p>Особенности:</p>
          <ul>
            <li>Нельзя взять 3 палочки, если они не рядом!</li>
            <li>Можно взять 1 или 2 палочки в любом месте</li>
            <li>Любимый вариант для игры на даче!</li>
          </ul>
        </div>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);

export const GoalRulesItem = () => (
  <Accordion.Item eventKey="6">
    <Accordion.Header>🏆 Стратегия победы</Accordion.Header>
    <Accordion.Body>
      <div className="rule-section">
        <p>Главная цель — оставить противника без возможных ходов!</p>
        <ul>
          <li>Планируйте ходы на несколько шагов вперед</li>
          <li>Старайтесь оставлять сопернику невыгодные позиции</li>
          <li>В стандартном режиме компьютер играет оптимально — учитесь у него!</li>
          <li>Последний, кто взял палочки — победитель!</li>
        </ul>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);

export const SettingsInfoItem = () => (
  <Accordion.Item eventKey="7">
    <Accordion.Header>⚙️ Настройки игры</Accordion.Header>
    <Accordion.Body>
      <div className="rule-section">
        <p>Перед игрой вы можете настроить:</p>
        <ul>
          <li><strong>Количество палочек</strong>: от 5 до 50</li>
          <li><strong>Режим игры</strong>: 1-5</li>
          <li>
            <strong>Параметры для режима</strong>:
            <ul>
              <li>Для режимов 1 и 3: максимальное число за ход (k)</li>
              <li>Для режимов 2 и 4: диапазон (a и b)</li>
            </ul>
          </li>
          <li><strong>Кто ходит первым</strong>: вы или компьютер</li>
        </ul>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);

export const ComputerInfoItem = () => (
  <Accordion.Item eventKey="8">
    <Accordion.Header>🤖 Особенности игры с компьютером</Accordion.Header>
    <Accordion.Body>
      <div className="rule-section">
        <ul>
          <li>В <strong>Стандартном режиме</strong> компьютер играет оптимально</li>
          <li>В других режимах компьютер делает случайные, но правильные ходы</li>
          <li>Компьютер всегда следует правилам игры</li>
          <li>Вы можете выбрать, кто ходит первым</li>
          <li>Для обучения играйте сначала за второго игрока</li>
        </ul>
      </div>
    </Accordion.Body>
  </Accordion.Item>
);