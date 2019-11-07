select steps.id, steps.step_number, steps.instructions, schemes.scheme_name
from steps
join schemes
on schemes.id=steps.scheme_id
where steps.scheme_id=1;