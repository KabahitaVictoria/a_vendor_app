"""updated notification model

Revision ID: fbde721a44c5
Revises: eb08b94bf179
Create Date: 2023-12-18 18:26:09.862227

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbde721a44c5'
down_revision = 'eb08b94bf179'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity', sa.Integer(), nullable=True))
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(length=100), autoincrement=False, nullable=True))
        batch_op.drop_column('quantity')

    # ### end Alembic commands ###
