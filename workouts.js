// Seus dados de treino. Edite livremente — cada exercício tem:
// nome, series, reps, peso (kg, pode ser null se você quiser definir depois) e obs (observação livre).
//
// Ordem de execução dentro de cada treino segue a lógica:
// 1) compostos multiarticulares (mais pesados/técnicos) primeiro, com o corpo fresco
// 2) isolados depois
// 3) músculos pequenos (panturrilha, bíceps, tríceps) e core por último
// Nos treinos de superiores (C e D), compostos de peito/costas/ombro vêm
// antes dos isolados de peito/costas/braço, pra não pré-fadigar o grupo maior.
const WORKOUTS = {
  A: {
    label: "Treino A",
    foco: "Quadríceps & pernas",
    exercicios: [
      { nome: "Agachamento Livre", series: 3, reps: "12", peso: 20, obs: "" },
      { nome: "Leg Press", series: 4, reps: "10", peso: 40, obs: "" },
      { nome: "Afundo", series: 3, reps: "12", peso: null, obs: "" },
      { nome: "Extensor", series: 3, reps: "12", peso: 9, obs: "3 séries (2x2)" },
      { nome: "Adutor", series: 3, reps: "12", peso: 45, obs: "3 séries (2x2)" },
      { nome: "Panturrilha", series: 4, reps: "12", peso: null, obs: "" },
    ],
  },
  B: {
    label: "Treino B",
    foco: "Glúteos",
    exercicios: [
      { nome: "Agachamento Máquina", series: 4, reps: "8-10", peso: 25, obs: "" },
      { nome: "Afundo Búlgaro", series: 4, reps: "10", peso: 12, obs: "3-4 séries" },
      { nome: "Elevação de Quadril (barra)", series: 4, reps: "até a falha", peso: 30, obs: "" },
      { nome: "Glúteo (caneleira)", series: 4, reps: "12", peso: 35, obs: "3-4 séries" },
      { nome: "Adutor", series: 3, reps: "12", peso: 45, obs: "3 séries (2x2)" },
      { nome: "Abdominal", series: null, reps: "", peso: null, obs: "definir séries/reps" },
    ],
  },
  C: {
    label: "Treino C",
    foco: "Peito, costas & braço",
    exercicios: [
      { nome: "Supino Reto", series: 3, reps: "15", peso: 6, obs: "" },
      { nome: "Puxada Aberta", series: 3, reps: "12", peso: 30, obs: "" },
      { nome: "Crucifixo (cross)", series: 3, reps: "15", peso: 10, obs: "" },
      { nome: "Remada Baixa", series: null, reps: "", peso: null, obs: "definir séries/reps" },
      { nome: "Pulldown (corda)", series: 3, reps: "15", peso: 25, obs: "" },
      { nome: "Tríceps (polia)", series: 3, reps: "15", peso: 25, obs: "" },
      { nome: "Tríceps Francês", series: null, reps: "", peso: null, obs: "definir séries/reps" },
    ],
  },
  D: {
    label: "Treino D",
    foco: "Posterior & ombro",
    exercicios: [
      { nome: "Levantamento Terra", series: null, reps: "", peso: null, obs: "definir séries/reps" },
      { nome: "Stiff (barra)", series: 4, reps: "8-10", peso: 20, obs: "" },
      { nome: "Flexora de Pernas", series: 4, reps: "10", peso: 30, obs: "drop set" },
      { nome: "Glúteos (máquina)", series: 4, reps: "10", peso: 4, obs: "drop set — confira essa carga" },
      { nome: "Desenvolvimento (barra)", series: 3, reps: "12", peso: 5, obs: "" },
      { nome: "Elevação Frontal", series: 3, reps: "12", peso: 5, obs: "" },
      { nome: "Rosca Alternada", series: 3, reps: "12", peso: 6, obs: "" },
    ],
  },
};