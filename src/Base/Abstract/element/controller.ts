
export interface IComponentProcessor<Tmeta, Tstate, Tcommand> {
	Meta: Tmeta,
	State: Tstate,
	Commands: Tcommand
}
