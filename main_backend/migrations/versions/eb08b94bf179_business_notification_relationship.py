"""business-notification relationship

Revision ID: eb08b94bf179
Revises: 25735001ef5d
Create Date: 2023-12-17 20:52:51.771156

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eb08b94bf179'
down_revision = '25735001ef5d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.alter_column('business_category_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.add_column(sa.Column('businesses_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'businesses', ['businesses_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('businesses_id')

    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.alter_column('business_category_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###