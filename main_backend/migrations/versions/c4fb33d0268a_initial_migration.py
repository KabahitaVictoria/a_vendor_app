"""initial migration

Revision ID: c4fb33d0268a
Revises: 7b447e7bf529
Create Date: 2023-12-19 10:42:13.518969

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'c4fb33d0268a'
down_revision = '7b447e7bf529'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('business_categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('icon', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    with op.batch_alter_table('analytics', schema=None) as batch_op:
        batch_op.add_column(sa.Column('event_name', sa.String(length=100), nullable=True))
        batch_op.create_unique_constraint(None, ['event_name'])
        batch_op.create_unique_constraint(None, ['event_type'])
        batch_op.create_unique_constraint(None, ['time_stamp'])

    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('video_url', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('business_category_id', sa.Integer(), nullable=False))
        batch_op.alter_column('logo',
               existing_type=mysql.VARCHAR(length=100),
               type_=sa.String(length=255),
               existing_nullable=True)
        batch_op.alter_column('user_id',
               existing_type=mysql.VARCHAR(length=200),
               type_=sa.Integer(),
               existing_nullable=True)
        batch_op.create_foreign_key(None, 'business_categories', ['business_category_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.drop_column('locations_id')
        batch_op.drop_column('employees')

    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.drop_index('TT_price')
        batch_op.drop_index('coupon_code')
        batch_op.drop_index('price')
        batch_op.drop_index('promotion')
        batch_op.drop_index('status')

    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.drop_index('description')
        batch_op.drop_index('image')
        batch_op.create_foreign_key(None, 'businesses', ['businesses_id'], ['id'])
        batch_op.drop_column('image')
        batch_op.drop_column('description')

    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.add_column(sa.Column('businesses_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'businesses', ['businesses_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.drop_column('orders_id')

    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.alter_column('order_date',
               existing_type=mysql.VARCHAR(length=35),
               nullable=True)
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'carts', ['carts_id'], ['id'])
        batch_op.drop_column('products_id')

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('description', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('business_category_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))
        batch_op.create_foreign_key(None, 'businesses', ['businesses_id'], ['id'])
        batch_op.create_foreign_key(None, 'business_categories', ['business_category_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'categories', ['category_id'], ['id'])
        batch_op.drop_column('image')
        batch_op.drop_column('origin')

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'orders', ['orders_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('last_name', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('user_type', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('profile_image_url', sa.String(length=255), nullable=True))
        batch_op.alter_column('password',
               existing_type=mysql.VARCHAR(length=10),
               type_=sa.String(length=255),
               existing_nullable=True)
        batch_op.alter_column('email',
               existing_type=mysql.VARCHAR(length=30),
               type_=sa.String(length=255),
               existing_nullable=True)
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', mysql.VARCHAR(length=100), nullable=True))
        batch_op.alter_column('email',
               existing_type=sa.String(length=255),
               type_=mysql.VARCHAR(length=30),
               existing_nullable=True)
        batch_op.alter_column('password',
               existing_type=sa.String(length=255),
               type_=mysql.VARCHAR(length=10),
               existing_nullable=True)
        batch_op.drop_column('profile_image_url')
        batch_op.drop_column('user_type')
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('origin', mysql.VARCHAR(length=30), nullable=True))
        batch_op.add_column(sa.Column('image', mysql.VARCHAR(length=255), nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('updated_at')
        batch_op.drop_column('category_id')
        batch_op.drop_column('business_category_id')
        batch_op.drop_column('description')
        batch_op.drop_column('quantity')

    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('products_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('order_date',
               existing_type=mysql.VARCHAR(length=35),
               nullable=False)

    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.add_column(sa.Column('orders_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('businesses_id')

    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', mysql.VARCHAR(length=100), nullable=True))
        batch_op.add_column(sa.Column('image', mysql.VARCHAR(length=255), nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_index('image', ['image'], unique=False)
        batch_op.create_index('description', ['description'], unique=False)

    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.create_index('status', ['status'], unique=False)
        batch_op.create_index('promotion', ['promotion'], unique=False)
        batch_op.create_index('price', ['price'], unique=False)
        batch_op.create_index('coupon_code', ['coupon_code'], unique=False)
        batch_op.create_index('TT_price', ['TT_price'], unique=False)

    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('employees', mysql.VARCHAR(length=255), nullable=True))
        batch_op.add_column(sa.Column('locations_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('user_id',
               existing_type=sa.Integer(),
               type_=mysql.VARCHAR(length=200),
               existing_nullable=True)
        batch_op.alter_column('logo',
               existing_type=sa.String(length=255),
               type_=mysql.VARCHAR(length=100),
               existing_nullable=True)
        batch_op.drop_column('business_category_id')
        batch_op.drop_column('video_url')

    with op.batch_alter_table('analytics', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('event_name')

    op.drop_table('business_categories')
    # ### end Alembic commands ###